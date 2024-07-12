import {createStackNavigator} from '@react-navigation/stack';
import BottomTab from '../../helpers/BottomTab';
import BookDetails from '../../screens/afterLogin/BookDetails/BookDetails';
import Payment from '../../screens/afterLogin/Payment/Payment';
import PdfViewer from '../../screens/afterLogin/PdfViewer/PdfViewer';
import BookVideos from '../../screens/afterLogin/BookVideos/BookVideos';
import Courses from '../../screens/afterLogin/Courses/Courses';
import CourseDetails from '../../screens/afterLogin/CourseDetails/CourseDetails';
import MyOrders from '../../screens/afterLogin/MyOrders/MyOrders';
import PaymentInfo from '../../screens/afterLogin/PaymentInfo/PaymentInfo';
import ChapterVideo from '../../screens/afterLogin/ChapterVideos/ChapterVideo';
import Home from '../../screens/afterLogin/Home/Home';
import Profile from '../../screens/afterLogin/Profile/Profile';
import Books from '../../screens/afterLogin/Books/Books';
import Chat from '../../screens/afterLogin/Chat/Chat';
import Notification from '../../screens/afterLogin/Notifications/Notification';
import PdfBooks from '../../screens/afterLogin/PdfBooks/PdfBooks';
import ProfileMenu from '../../screens/afterLogin/Profile/ProfileMenu/ProfileMenu';
import AnalogPaymentForm from '../../screens/afterLogin/AnalogPaymentForm/AnalogPaymentForm';
import FullImageView from '../../screens/afterLogin/viewFullImage/FullImageView';
import BookBundles from '../../screens/afterLogin/Books/BookBundles';
import Login from '../../screens/beforeLogin/login/Login';
import Otp from '../../screens/beforeLogin/otp/Otp';
import Settings from '../../screens/afterLogin/Settings/Settings';
import SignUp from '../../screens/beforeLogin/signUp/SignUp';
import UserBooks from '../../screens/afterLogin/UserBooks/UserBooks';

const Stack = createStackNavigator();
const AfterLoginStack = route => {
  return (
    <Stack.Navigator
      initialRouteName={'BottomTab'}
      screenOptions={{
        headerStyle: {elevation: 0},
        cardStyle: {backgroundColor: '#fff'},
      }}>
      {/* //added file */}

      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen name="Home" component={Home} /> */}
      <Stack.Screen
        name="BookDetails"
        component={BookDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserBooks"
        component={UserBooks}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BookVideos"
        component={BookVideos}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Courses"
        component={Courses}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PdfViewer"
        component={PdfViewer}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="CourseDetails"
        component={CourseDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyOrders"
        component={MyOrders}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentInfo"
        component={PaymentInfo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChapterVideo"
        component={ChapterVideo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Books"
        component={Books}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PdfBooks"
        component={PdfBooks}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileMenu"
        component={ProfileMenu}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="AnalogPaymentForm"
        component={AnalogPaymentForm}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FullImageView"
        component={FullImageView}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BookBundles"
        component={BookBundles}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Otp" component={Otp} options={{headerShown: false}} /> */}
    </Stack.Navigator>
  );
};

export default AfterLoginStack;
