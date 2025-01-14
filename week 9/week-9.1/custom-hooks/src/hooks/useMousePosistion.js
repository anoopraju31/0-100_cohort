import { useEffect, useState } from 'react'

const useMousePosistion = () => {
	const [position, setPosition] = useState({ x: 0, y: 0 })

	useEffect(() => {
		const getPosition = (e) => {
			setPosition({ x: e.clientX, y: e.clientY })
		}

		window.addEventListener('mousemove', getPosition)

		return () => window.removeEventListener('mousemove', getPosition)
	}, [])

	return position
}

export default useMousePosistion
