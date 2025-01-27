import axios from "axios";

export default function EditTutorAdmin({ tutor, deleteTutor, setIsEdit, setIsAdd }) {

    const handleUpdateTutor = async (evt) => {
        evt.preventDefault();

        await axios.posst('http://localhost:5000/api/tutor/updateTutor', {
            id: tutor.id,
            firstname: tutorInfoUpdate.firstname,
            lastname: tutorInfoUpdate.lastname,
            patronymic: tutorInfoUpdate.patronymic,
            email: tutorInfoUpdate.email
        }).then(response => {
            if (!response.data.tutor) {
                alert(response.data.message);
            } else {
                console.log(response.data.tutor)
            }
        }).catch(e => {
            console.log(e);
        })
    }


    const handleDeleteTutor = async (evt) => {
        evt.preventDefault();

        await axios.post('http://localhost:5000/api/tutor/deleteTutor', { email: tutor.email })
            .then(response => {
                if (response.status === 200) {
                    deleteTutor(tutor);
                    setIsAdd();
                    setIsEdit()
                }
            }).catch(e => {
                console.log(e.response);
            })
    }

    return (
        <div className="tutor-admin-info-container">
            <h2>Информация</h2>
            <form className='tutor-info'>
                <label htmlFor='firstname'>Имя</label>
                <input type='text' id='firstname' name='firstname'
                    value={tutor.firstname}
                    required />

                <label htmlFor='lastname'>Фамилия</label>
                <input type='text' id='lastname' name='lastname'
                    value={tutor.lastname}
                    required />

                <label htmlFor='patronymic'>Отчество</label>
                <input type='text' id='patronymic' name='patronymic'
                    value={tutor.patronymic}
                    required />

                <label htmlFor='email'>Почта</label>
                <input type='text' id='email' name='email'
                    value={tutor.email}
                    required />

                <button className='btn-delete' onClick={handleDeleteTutor}>Удалить</button>
                <button className="btn-edit" onClick={handleUpdateTutor}>Изменить</button>
            </form>
        </div>
    )
}
