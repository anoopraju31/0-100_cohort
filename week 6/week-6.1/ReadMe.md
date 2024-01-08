# Week 6.1 React Deeper Dive

### React Component Returns
- A Component can only return a single top level XML.
- We could contain multiple children components inside the top level XML.
- The example shown below is wrong as there are two top level XML.
![Two top level XML](/week%206/week-6.1/images/two-top-level-xml.png)
![Two top level XML error](/week%206/week-6.1/images/two-top-level-xml-error.png)
- In the above scenario, we could wrap the two top level xml in a **React.Fragment (<></>)**.
- This a slightly better solution as it does not introduce an extra DOM element.
![with react fragment ](/week%206/week-6.1/images/top-level-frament-symbol.png)
![with react fragment](/week%206/week-6.1/images/top-level-react-fragment-component.png)
- The main reason behind a component returning a single top level XML is that, it makes react easy to do **reconciliation**.  

### What exactly is re-rendering in react?
- In React, re-rendering refers to the process of updating the user interface (UI) in response to changes in the application's state or props. 
- When the state or props of a React component change, React will re-run the component's render method to generate a new virtual DOM representation of the UI. It then compares the new virtual DOM with the previous one to identify the differences (diffing). After identifying the differences, React updates only the parts of the actual DOM that have changed, instead of re-rendering the entire UI.