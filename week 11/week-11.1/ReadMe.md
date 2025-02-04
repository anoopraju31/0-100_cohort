# Week 11.1 - Serverless Fns

## Contents:
- [**What are backends servers?**](#what-are-backends-servers)
- [**What are Serverless Backends**](#what-are-serverless-backends)
- [**Famous Serverless Providers**](#famous-serverless-providers)
- [**When Should We use a serverless architecture?**](#when-should-you-use-a-serverless-architecture)
- [**Cloudflare Worker Setup**](#cloudflare-workers-setup)
- [**How cloudflare workers work**](#how-cloudflare-workers-work)
- [**Initializing a worker**](#initializing-a-worker)
    - [**How can I do Routing?**](#how-can-i-do-routing)
- [**Deploying a worker**](#deploying-a-worker)
- [**Adding express to it**](#adding-express-to-it)
- [**Using hono**](#using-hono)
    - [**What runtimes does it support?**](#what-runtimes-does-it-support)
    - [**Working with cloudflare workers**](#working-with-cloudflare-workers)
    - [**Getting inputs from user**](#getting-inputs-from-user)
    - [**Deploying**](#deploying)
- [**Middlewares**](#middlewares)
- [**Connecting to DB**]() 

### What are backends servers?
- We have used **express** to create a Backend server and the way we run it usually is **node index.js** which starts a process on a certain port(usually 3000).
- When we have to deploy the it on the internet, we usually go with any of the cloud providers like **AWS**, **GCP**, **Azure** or **Cloudflare**.
- After choosing the cloud provider of our choice, we need to rent a **VM(Virtual Machine)** and deploy our app.
- Put it in an **Auto Scaling Group**.
- Deploy it in a **Kubernetes Cluster**.
- There are few Downsides to doing this - 
    - Taking care of how/when to scale.
    - Base cost even if no one is visiting out website.
    - Monitoring various servers to make sure no server is down.

### What are Serverless Backends
- **Serverless** is a backend deployment in which the cloud provider dynamically manages the allocation and provisioning of servers. 
- The term **serverless** doesn't mean there are no servers involved, instead it means that developers and operators do not have to worry about the servers.
- An easier definition can be what if we could just write our **express routes** and run a command, that would automatically **deploy**, **autoscale** and charge us on a **per request basics** (rather than we pay for VMs)
- The problem with this approach are - 
    - More expensive at scaling
    - Cold start problem - when our server is inactive for a some period, the providers shutdown the server until a new request has been made. When a new request is recived the a new server instance will be created. the first request after a period of inactivity would take longer to recive a response and the subsequent request will have a faster response than the first.

### Famous Serverless Providers
There are many famous backend serverless providers - 
1. [AWS Lambda](https://aws.amazon.com/pm/lambda/)
2. [Google Cloud Functions](https://firebase.google.com/docs/functions)
3. [Cloudflare Workers](https://workers.cloudflare.com/)

### When should you use a serverless architecture?
1. When we have to get off the ground fast and don’t want to worry about deployments.
2. When we can’t anticipate the traffic and don’t want to worry about autoscaling.
3. If we have very low traffic and want to optimise for costs.

### Cloudflare workers setup
- Please sign up on [Cloudflare](https://cloudflare.com/)
![](images/cloudflare-signup.jpg)

### How cloudflare workers work?
- [Detailed Blog Post](https://developers.cloudflare.com/workers/reference/how-workers-works/#:~:text=Though%20Cloudflare%20Workers%20behave%20similarly,used%20by%20Chromium%20and%20Node)
- ![](images/how-cloudflare-works.jpg)
- ![](images/isolates.jpg)

### Initializing a worker
- To create and deploy our application, we can take the following steps -
    1. Initialize a worker
        ```bash
        npm create cloudflare -- my-app
        ```
        Select no for Do you want to deploy your application
    2. Explore package.json dependencies
        ```bash
        "wrangler": "^3.0.0"
        ```
        Notice express is not a dependency there
    3. Start the worker locally
        ```bash
        npm run dev
        ```
    4. How to return json?
        ```ts
        export default {
            async fetch(
                request: Request, 
                env: Env, 
                ctx: ExecutionContext
            ): Promise<Response> {
                return Response.json({
                    message: "hi"
                });
            },
        };
        ```
- Cloudflare expects us to just write the logic to handle a request. Creating an HTTP server on top is handled by cloudflare.

#### How can I do Routing?
- In express, routing is done as follows - 
```js
import express from "express"
const app = express();

app.get("/route", (req, res) => {
	// handles a get request to /route
});
```
- Routing in the Cloudflare environment -
```ts
export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		console.log(request.body);
		console.log(request.headers);
		
		if (request.method === "GET") {
			return Response.json({
				message: "you sent a get request"
			});
		} else {
			return Response.json({
				message: "you did not send a get request"
			});
		}
	},
};
```

### Deploying a worker
- For deploying a worker we use [wrangler]( https://developers.cloudflare.com/workers/wrangler/)
- ![Wrangler (Command line)](images/wrangler-cli.jpg)
1. Login to cloudflare via the **wrangler cli**
    ```bash
    npx wrangler login
    ```
    ![Wrangler login](images/wrangler-login.jpg)
2. Deploy our worker
    ```bash
    npm run deploy
    ```
    If all goes well, we should see the app up and running.

### Adding express to it
- Cloudflare doesnot support **express.js** as it heavily relies on **Node.js**.
- Cloudflare has a custom javascript runtime environment with is different from **Node.js**.
- There are a few alternatives to **express.js**
    - **hono.js** - [**Hono.js**](https://github.com/honojs/hono) is a ultra fast web framework for cloudflare workers, Deno, Bun and Node.js.
    ![](images/hono-alternative-to-express.jpg)
- If the codebase is in express.js, we can split all the handler in a file. Create a generic handler that can forward request from either express or hono or native cloudflare handler.
![](images/split-handler.jpg)
![](images/express-to-cloudflare-routes.jpg)

### Using hono
[![](images/hono-motivation.jpg)](https://hono.dev/concepts/motivation)

#### What runtimes does it support?
![](images/hono-runtime.jpg)

#### Working with cloudflare workers
1. Initialize a new app
    ```bash
    npm create hono@latest my-app
    ```
2. Move to **my-app** and install the dependencies.
    ```bash
    cd my-app
    npm i
    ```
3. Hello World
    ```js
    import { Hono } from 'hono'
    const app = new Hono()

    app.get('/', (c) => c.text('Hello Cloudflare Workers!'))

    export default app
    ```
#### Getting inputs from user
``` js
import { Hono } from 'hono'

const app = new Hono()

app.post('/', async (c) => {
  const body = await c.req.json()
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  return c.text('Hello Hono!')
})

export default app
```
#### Deploying 
- Make sure you’re logged into cloudflare (**wrangler login**)
    ```bash
    npm run deploy
    ```

### Middlewares
- creating a simple auth middleware
``` js
import { Hono, Next } from 'hono'
import { Context } from 'hono/jsx';

const app = new Hono()

app.use(async (c, next) => {
  if (c.req.header("Authorization")) {
    // Do validation
    await next()
  } else {
    return c.text("You dont have acces");
  }
})

app.get('/', async (c) => {
  const body = await c.req.parseBody()
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  return c.json({msg: "as"})
})

export default app
```