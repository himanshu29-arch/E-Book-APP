import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../../screens/afterLogin/Home/Home';
import {CustomDrawerContent} from './CustomDrawer';
import {wp} from '../resDimension';
import {color} from '../../constants/colors/colors';
import BottomTab from '../BottomTab';
import Login from '../../screens/beforeLogin/login/Login';
import SignUp from '../../screens/beforeLogin/signUp/SignUp';
import Otp from '../../screens/beforeLogin/otp/Otp';
import ForgotPass from '../../screens/beforeLogin/forgotPass/forgotPass';
import BookDetails from '../../screens/afterLogin/BookDetails/BookDetails';
import Payment from '../../screens/afterLogin/Payment/Payment';
import PdfViewer from '../../screens/afterLogin/PdfViewer/PdfViewer';
import BookVideos from '../../screens/afterLogin/BookVideos/BookVideos';
import Profile from '../../screens/afterLogin/Profile/Profile';
import Courses from '../../screens/afterLogin/Courses/Courses';
import CourseDetails from '../../screens/afterLogin/CourseDetails/CourseDetails';
import MyOrders from '../../screens/afterLogin/MyOrders/MyOrders';
import PaymentInfo from '../../screens/afterLogin/PaymentInfo/PaymentInfo';
import ChapterVideo from '../../screens/afterLogin/ChapterVideos/ChapterVideo';
import Books from '../../screens/afterLogin/Books/Books';
import Chat from '../../screens/afterLogin/Chat/Chat';
import Notification from '../../screens/afterLogin/Notifications/Notification';
import PdfBooks from '../../screens/afterLogin/PdfBooks/PdfBooks';

const Drawer = createDrawerNavigator();

export function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="BottomTab"
      screenOptions={{
        drawerStyle: {
          width: wp(70),
        },
        overlayColor: 'rgba(54, 75, 159, 0.5)',
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="BottomTab"
        component={BottomTab}
        options={{headerShown: false}}
      />
      <Drawer.Screen name="Home" component={Home} />

      <Drawer.Screen
        name="BookDetails"
        component={BookDetails}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Payment"
        component={Payment}
        options={{headerShown: false}}
      />

      <Drawer.Screen
        name="BookVideos"
        component={BookVideos}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Courses"
        component={Courses}
        options={{
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="PdfViewer"
        component={PdfViewer}
        options={{headerShown: false}}
      />

      <Drawer.Screen
        name="CourseDetails"
        component={CourseDetails}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="MyOrders"
        component={MyOrders}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="PaymentInfo"
        component={PaymentInfo}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="ChapterVideo"
        component={ChapterVideo}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Books"
        component={Books}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="PdfBooks"
        component={PdfBooks}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}
