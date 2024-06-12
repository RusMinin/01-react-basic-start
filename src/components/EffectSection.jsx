import { useEffect, useState } from 'react'
import Button from './Button/Button'
import Modal from './Modal/Modal'
import useInput from './Hooks/useInput'

export default function EffectSection() {
    const input  = useInput()
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])




    useEffect(() => {
        async function fetchUsers() {
            setLoading(true)
            const response = await fetch('https://jsonplaceholder.typicode.com/users')
            const users = await response.json()
            setUsers(users)
            setLoading(false)
        }
        fetchUsers()
    }, [])




    return (
        <section>
            <h3>Effects</h3>

            <Button style={{ marginBottom: '1rem' }} onClick={() => setModal(true)}>Открыть информацию</Button>

            <Modal open={modal}>
                <h3>Hello from Modal</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Exercitationem accusamus voluptas eveniet dolor magni nihil odio impedit? Enim impedit,
                    consequatur qui ipsa quasi nihil sint sunt temporibus odit eveniet officia.
                </p>

                {/* <Button onClick={closeModal}>Close</Button> */}
                {/* Функцию для закрывания модального окна можно вынести отдельно а можно прописать инлайн способом */}
                <Button onClick={() => setModal(false)}>Close</Button>
            </Modal>


            {loading && <p>Loading...</p>}
           
            {!loading && (
                 <>
                 <input type="text" className='control' {...input}/>
                 <h6>{input.value}</h6>
                <ul>
                    {users.filter(user => user.name.toLowerCase().includes(input.value.toLocaleLowerCase())
                    )
                    .map((user) => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
                </>
            )}

        </section>

    )
}