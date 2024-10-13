package com.sohojporaa

import android.os.Bundle
import android.view.WindowManager;
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import org.devio.rn.splashscreen.SplashScreen

class MainActivity : ReactActivity() {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    override fun getMainComponentName(): String = "SohojPora"
    override fun onCreate(savedInstanceState: Bundle?) {
        // Show splash screen before calling super.onCreate
        // SplashScreen.show(this)
        super.onCreate(null)  // Pass null to prevent restoring the instance state
    getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);
    }
    /**
     * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
     * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate {
        SplashScreen.show(this)
        return DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
    }

}
