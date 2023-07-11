import 'package:flutter/material.dart';
import 'package:flutter_application/profile2page.dart';

class SchedulePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('일정 페이지'),
        elevation: 0.0,
        backgroundColor: Colors.blueAccent,
        centerTitle: true,
      ),
      body: Center(
        child: Text(
          '일정 페이지',
          style: TextStyle(fontSize: 24.0),
        ),
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            UserAccountsDrawerHeader(
              currentAccountPicture: CircleAvatar(
                backgroundImage: AssetImage('assets/MadCamp.png'),
                backgroundColor: Colors.white,
              ),
              accountName: Text('김태훈'),
              accountEmail: Text('1분반'),
              decoration: BoxDecoration(
                  color: Colors.blue[200],
                  borderRadius: BorderRadius.only(
                      bottomLeft: Radius.circular(40.0),
                      bottomRight: Radius.circular(40.0))),
            ),
            ListTile(
              leading: Icon(
                Icons.person,
                color: Colors.grey[850],
              ),
              title: Text('Profile'),
              onTap: () {
                Navigator.push(context, MaterialPageRoute(builder: (context)=>Profile2Page()));
                print('Profile is clicked');
              },
            ),
            // ListTile(
            //   leading: Icon(
            //     Icons.settings,
            //     color: Colors.grey[850],
            //   ),
            //   title: Text('Setting'),
            //   onTap: () {
            //     print('Setting is clicked');
            //   },
            // ),
          ],
        ),
      ),
    );
  }
}
