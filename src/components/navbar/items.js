import HomeImage from '../../assets/images/navbar/home.png';
import QueryImage from '../../assets/images/navbar/query.png';
import MessageImage from '../../assets/images/navbar/message.png';
import JobsImage from '../../assets/images/navbar/jobs.png';
import MetricsImage from '../../assets/images/navbar/metrics.png';
import NotificationImage from '../../assets/images/navbar/notifications.png';
import InvoiceImage from '../../assets/images/navbar/invoice.png';
import UsersImage from '../../assets/images/navbar/userDetails1.png';

const NavBarItems = [
    { name: 'Home', id: 1, key: 'home', image: HomeImage },
    { name: 'Query', id: 2, key: 'query', image: QueryImage },
    { name: 'Messages', id: 3, key: 'messages', image: MessageImage },
    { name: 'My Jobs', id: 4, key: 'jobs', image: JobsImage },
    { name: 'Metrics', id: 5, key: 'metrics', image: MetricsImage },
    { name: 'Invoices', id: 6, key: 'invoices', image: InvoiceImage },
   // { name: 'Notifications', id: 7, key: 'notifications', image: NotificationImage },
   { name: 'Users', id: 7, key: 'user_details', image: UsersImage },
   { name: 'Notifications', id: 8, key: 'notifications', image: NotificationImage },
]

export default NavBarItems