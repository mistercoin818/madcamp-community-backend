import 'package:flutter/material.dart';
import 'package:flutter_application/allpage.dart';
import 'package:flutter_application/classpage.dart';
import 'package:flutter_application/schedulepage.dart';


class MainPage extends StatefulWidget {
  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {

  int _selectedIndex = 0;

  static const TextStyle optionStyle = TextStyle(
    fontSize: 30,
    fontWeight: FontWeight.bold
  );



  final List<Widget> _widgetOptions = <Widget>[
    AllPage(),
    ClassPage(),
    SchedulePage(),
  ];

  void _onItemTapped(int index){
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: _widgetOptions.elementAt(_selectedIndex),
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: '전체 게시판'
          ),
          BottomNavigationBarItem(
              icon: Icon(Icons.text_snippet),
              label: '분반 게시판'
          ),
          BottomNavigationBarItem(
              icon: Icon(Icons.schedule),
              label: '일정 게시판'
          ),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: Colors.blueAccent,
        onTap: _onItemTapped,
      ),
    );
  }
}