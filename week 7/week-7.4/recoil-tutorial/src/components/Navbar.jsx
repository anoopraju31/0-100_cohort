import { useRecoilValue } from 'recoil'
import NavItem from './NavItem'
import {
	jobsNotificationAtom,
	messageNotificationAtom,
	networkNotificationAtom,
	totalNotificationSelector,
} from '../store/atoms'

const Navbar = () => {
	const networkNotificationCount = useRecoilValue(networkNotificationAtom)
	const messageNotificationCount = useRecoilValue(messageNotificationAtom)
	const jobNotificationCount = useRecoilValue(jobsNotificationAtom)
	const totalNotificationCount = useRecoilValue(totalNotificationSelector)

	return (
		<nav className='p-10 flex justify-center items-center gap-5'>
			<NavItem title='Home' />
			<NavItem title='network' count={networkNotificationCount} />
			<NavItem title='Messages' count={messageNotificationCount} />
			<NavItem title='Jobs' count={jobNotificationCount} />
			<NavItem title='Profile' count={totalNotificationCount} total />
		</nav>
	)
}

export default Navbar
