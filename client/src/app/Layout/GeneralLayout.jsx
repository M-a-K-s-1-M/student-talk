import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DefaultPage from '../../pages/DefaultPage/DefaultPage';

import NotificationsSectionStudent from '../../pages/NotificationsSection/NotificationsSectionStudent/NotificationsSectionStudent';
import DeadlineSection from '../../pages/DeadlineSection/DeadlineSection';
import ProfileStudent from './../../pages/Profile/ProfileStudent/ProfileStudent';

import NotificationsSectionTutor from '../../pages/NotificationsSection/NotificationsSectionTutor/NotificationsSectionTutor';
import TicketsSectionTutor from '../../pages/TicketsSectionTutor/TicketsSectionTutor';
import ProfileTutor from '../../pages/Profile/ProfileTutor/ProfileTutor';

import StudentLayout from './StudentLayout';
import TutorLayout from './TutorLayout';



export default function GeneralLayout() {
    const role = 'student';
    return (
        <Routes>
            {role === 'student' && <>
                <Route path='/' element={<StudentLayout role='student' />}>
                    {/* Студентские маршруты */}
                    <Route index element={<DefaultPage />} />
                    <Route path="notifications" element={<NotificationsSectionStudent />} />
                    <Route path="deadlines" element={<DeadlineSection />} />
                    <Route path="profile" element={<ProfileStudent />} />
                </Route>
            </>}

            {role === 'tutor' && <>
                <Route path='/' element={<TutorLayout role='tutor' />}>
                    {/* Тьюторские маршруты */}
                    < Route index element={< DefaultPage />} />
                    < Route path="notifications" element={< NotificationsSectionTutor />} />
                    < Route path="tickets" element={< TicketsSectionTutor />} />
                    < Route path="profile" element={< ProfileTutor />} />
                </Route>
            </>}

        </Routes>
    )
}
