import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'

const CallToAction = () =>  (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className='flex-1 justify-center flex flex-col'>
            <h2 className='text-2xl'>Want to learn more about JavaScript?</h2>
            <p className='text-gray-500 my-2'>Checkout these resources.</p>
            <Button gradientDuoTone={'purpleToPink'} className='rounded-tl-xl rounded-bl-none '>
                <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">Click Me</a>
            </Button>
        </div>
        <div className='p-7'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk0IaRDjBvZC4Ga4GfQPWxacgvFVTF1rlWUw&s" />
        </div>

    </div>
  )

export default CallToAction