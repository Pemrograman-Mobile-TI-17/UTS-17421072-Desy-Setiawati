package com.example.tamanbaca.admin;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;

import android.content.Intent;
import android.content.SharedPreferences;
import android.icu.util.Calendar;
import android.os.Bundle;
import android.view.View;
import android.widget.CalendarView;

import com.example.tamanbaca.R;
import com.example.tamanbaca.session.PrefSetting;
import com.example.tamanbaca.session.SessionManager;
import com.example.tamanbaca.users.LoginActivity;

public class HomeAdminActivity extends AppCompatActivity {

    SessionManager session;
    SharedPreferences prefs;
    PrefSetting prefSetting;
    CardView cardExit, cardDataBuku, cardInputBuku, cardProfile;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home_admin);

        prefSetting = new PrefSetting(this);
        prefs = prefSetting.getSharePreferances();

        session = new SessionManager(HomeAdminActivity.this);

        prefSetting.isLogin(session, prefs);

        cardExit =(CardView) findViewById(R.id.cardExit);
        cardDataBuku = (CardView) findViewById(R.id.cardDataBuku);
        cardInputBuku = (CardView) findViewById(R.id.cardInputBuku);
        cardProfile = (CardView) findViewById(R.id.cardProfile);

        cardExit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                session.setLogin(false);
                session.setSessid(0);
                Intent i = new Intent(HomeAdminActivity.this, LoginActivity.class);
                startActivity(i);
                finish();
            }
        });
        cardDataBuku.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent i = new Intent(HomeAdminActivity.this, ActivityDataBuku.class);
                startActivity(i);
                finish();
            }
        });
        cardInputBuku.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent i = new Intent(HomeAdminActivity.this, InputDataBuku.class);
                startActivity(i);
                finish();
            }
        });
        cardProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent i = new Intent(HomeAdminActivity.this, Profile.class);
                startActivity(i);
                finish();
            }
        });
    }
}
