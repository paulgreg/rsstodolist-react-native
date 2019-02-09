package com.rsstodolist;

import android.os.Bundle;
import android.content.Intent;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;


public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "rsstodolist";
    }


    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
      return new ReactActivityDelegate(this, getMainComponentName()) {
        @Override
        protected Bundle getLaunchOptions() {
          Intent intent = MainActivity.this.getIntent();

          Bundle bundle = new Bundle();
          if (intent.getData() != null) {
            bundle.putString("url", intent.getData().toString());
          } else if (intent.getStringExtra(Intent.EXTRA_TEXT) != null) {
            bundle.putString("url", intent.getStringExtra(Intent.EXTRA_TEXT));
          }
          return bundle;
        }
      };
    }
}
