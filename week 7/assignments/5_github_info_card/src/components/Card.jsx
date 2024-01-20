import { useEffect } from 'react'
import { useState } from 'react'
import Stats from './Stats'

const Card = () => {
	const [profile, setProfile] = useState({})

	useEffect(() => {
		const getProfile = async () => {
			const res = await fetch('https://api.github.com/users/anoopraju31')
			const data = await res.json()

			setProfile(data)
		}
		getProfile()
	}, [])

	if (!profile) return null

	return (
		<div className='max-w-lg mx-auto p-10 rounded-xl hover:shadow-lg bg-orange-200 shadow-orange-900'>
			<div className='w-fit mx-auto'>
				<img
					className='w-52 h-52 rounded-full '
					src={profile?.avatar_url}
					alt={profile?.login}
				/>
			</div>

			<div className='py-6 flex flex-col gap-1 justify-center items-center'>
				<h2 className='text-3xl font-bold font-mono text-orange-950'>
					{' '}
					{profile?.name}{' '}
				</h2>
				<p className='text-xl font-medium font-mono text-orange-700'>
					{profile?.login}
				</p>
				<p className='text-center mt-3 font-mono text-orange-700'>
					{profile.bio}
				</p>
			</div>

			<div className='grid grid-cols-3 items-center justify-between gap-4 mt-5'>
				<Stats title='follower' stat={profile.followers} />
				<Stats title='public repos' stat={profile.public_repos} />
				<Stats title='following' stat={profile.following} />
			</div>
		</div>
	)
}

export default Card