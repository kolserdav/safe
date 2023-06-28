package com.kolserdav.ana;

import android.app.Activity;
import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.net.ConnectivityManager;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.Window;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebSettings;
import android.webkit.WebViewClient;

import org.chromium.net.CronetEngine;
import org.chromium.net.UrlRequest;

import java.net.URL;
import java.util.EventListener;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class MainActivity extends Activity {

    MainActivity context;
    private static final String TAG = "MainActivity";

    public WebView mWebView;

    private EventListener event = new Event();

    public DB db;

    private Config config = new Config();

    private Helper helper;

    private Boolean firstLoad = true;

    private Request request = new Request(this);

    public interface Check {
        void onGetStatusCode(int a);
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        context = this;
        getWindow().requestFeature(Window.FEATURE_NO_TITLE);

        helper = new Helper(this, this);


        mWebView = new WebView(this);
        WebSettings webSettings = this.mWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setLoadWithOverviewMode(true);
        webSettings.setUseWideViewPort(true);
        webSettings.setBuiltInZoomControls(true);
        webSettings.setDisplayZoomControls(false);
        webSettings.setSupportZoom(false);

        ConnectivityManager cm = (ConnectivityManager) this.getSystemService(Activity.CONNECTIVITY_SERVICE);
        if(cm != null && cm.getActiveNetworkInfo() != null && cm.getActiveNetworkInfo().isConnected()){
            webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);
        }
        else{
            webSettings.setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
        }

        webSettings.setDefaultTextEncodingName("utf-8");

        TTS tts = new TTS(this);
        mWebView.addJavascriptInterface(new AndroidTextToSpeech(tts), "androidTextToSpeech");
        mWebView.addJavascriptInterface(new AndroidCommon(this), "androidCommon");


        webViewListeners();

        db = new DB(this) {
            @Override
            public void onCreate(SQLiteDatabase _sqLiteDatabase) {
                // db.app.clear();
                // db.app.drop();
                Log.d(TAG, "On create DB");
                Intent intent = getIntent();
                String url =  helper.listenProcessText(intent, this.app.schema);
                setContentView(mWebView);

                Check check = new Check(){
                    public void onGetStatusCode(int status) {
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                String _url = url;
                                if (status != 200) {
                                    Log.w(TAG, "Url replaced " + _url);
                                    _url = url.replace(_url, context.db.app.schema.urlDefault);
                                }
                                Log.d(TAG,"Status is " + status + ", load url " + _url);
                                mWebView.loadUrl(_url);
                                Log.d(TAG,"Load url " + _url);
                                helper.microphoneAccess();
                            }
                        });
                    }
                };

                checkUrl(url + config.CHECK_URL_PATH, check);
            }
        };


    }



        public void checkUrl(String url, Check check) {
            CronetEngine cronetEngine = request.buildRequest(check);
            Executor executor = Executors.newSingleThreadExecutor();
            UrlRequest.Builder requestBuilder = cronetEngine.newUrlRequestBuilder(
                    url, request, executor);
            UrlRequest request = requestBuilder.build();
            request.start();
        }



    private void webViewListeners() {
        mWebView.setWebChromeClient(new WebChromeClient() {

            @Override
            public void onPermissionRequest(final PermissionRequest request) {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        request.grant(request.getResources());
                    }
                });

            }

        });

        mWebView.setWebViewClient(new WebViewClient() {

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String _url) {
                String url = _url;

                Log.d(TAG, "Should override url " + url +
                        " with saved " + db.app.schema.path);

                Pattern pattern = Pattern.compile(db.app.schema.url, Pattern.CASE_INSENSITIVE);
                Matcher matcher = pattern.matcher(url);
                boolean matchFound = matcher.find();

                if (url != db.app.schema.url + db.app.schema.path && matchFound) {
                    url = db.app.schema.url + db.app.schema.path;
                }
                view.loadUrl(url);

                if (firstLoad) {
                    Thread task = new Thread() {
                        public void run() {
                            try {
                                Thread.sleep(helper.FIRST_LOAD_DURATION);
                                Log.d(TAG, "First load is " + firstLoad);
                                firstLoad = false;
                            } catch(InterruptedException v) {
                                Log.e(TAG, v.toString());
                            }
                        }
                    };
                    task.start();
                }
                return true;
            }

            @Override
            public void doUpdateVisitedHistory(WebView view, String url, boolean isReload) {
                super.doUpdateVisitedHistory(view, url, isReload);

                if (!firstLoad) {
                    AppInterface _app = new AppInterface(db.app.schema.id,
                            db.app.schema.url,
                            db.app.schema.urlDefault, db.app.schema.path);
                    _app.path = url.replace(_app.url, "");
                    db.app.setPath(_app);
                    Log.d(TAG, "Change path  from " + _app.path + " to " + db.app.schema.path);
                }
            }
        });
    }


    @Override
    public boolean onKeyDown(final int keyCode, final KeyEvent event) {
        if ((keyCode == KeyEvent.KEYCODE_BACK) && mWebView.canGoBack()) {
            mWebView.goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }
}



