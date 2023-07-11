import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:http/http.dart' as http;
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class Profile2Page extends StatefulWidget {
  const Profile2Page({super.key});

  @override
  State<Profile2Page> createState() => _Profile2PageState();
}

class _Profile2PageState extends State<Profile2Page> {
  File? _imageFile;
  final ImagePicker _picker = ImagePicker();

  Future<void> uploadImageToBackend(File imageFile) async {
    final url = Uri.parse('http://172.10.5.118:443/upload');
    final request = http.MultipartRequest('POST', url);
    request.files
        .add(await http.MultipartFile.fromPath('image', imageFile.path));

    final response = await request.send();

    if (response.statusCode == 200) {
      // 이미지 업로드 성공
      // TODO: 추가적인 처리 로직 작성
    } else {
      // 이미지 업로드 실패
      // TODO: 에러 처리 로직 작성
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile'),
        elevation: 0.0,
        backgroundColor: Colors.blueAccent,
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 20),
        child: ListView(
          children: <Widget>[
            imageProfile(),
            const SizedBox(height: 20),
            const Row(
              children: <Widget>[
                Icon(Icons.check_circle_outline),
                SizedBox(
                  width: 10.0,
                ),
                Text(
                  '이름: ',
                  style: TextStyle(fontSize: 16.0, letterSpacing: 1.0),
                ),
                Text(
                  '김태훈',
                  style: TextStyle(fontSize: 16.0, letterSpacing: 1.0),
                )
              ],
            ),
            const SizedBox(height: 20),
            const Row(
              children: <Widget>[
                Icon(Icons.check_circle_outline),
                SizedBox(
                  width: 10.0,
                ),
                Text(
                  '분반: ',
                  style: TextStyle(fontSize: 16.0, letterSpacing: 1.0),
                ),
                Text(
                  '1분반',
                  style: TextStyle(fontSize: 16.0, letterSpacing: 1.0),
                )
              ],
            ),
            const SizedBox(height: 20),
            const Row(
              children: <Widget>[
                Icon(Icons.check_circle_outline),
                SizedBox(
                  width: 10.0,
                ),
                Text(
                  '학교: ',
                  style: TextStyle(fontSize: 16.0, letterSpacing: 1.0),
                ),
                Text(
                  '성균관대학교',
                  style: TextStyle(fontSize: 16.0, letterSpacing: 1.0),
                )
              ],
            ),
            const SizedBox(height: 20),
            const Row(
              children: <Widget>[
                Icon(Icons.check_circle_outline),
                SizedBox(
                  width: 10.0,
                ),
                Text(
                  'KAIST 학번: ',
                  style: TextStyle(fontSize: 16.0, letterSpacing: 1.0),
                ),
                Text(
                  '20236231',
                  style: TextStyle(fontSize: 16.0, letterSpacing: 1.0),
                )
              ],
            ),
            const SizedBox(height: 20),
            nicknameTextField(),
            const SizedBox(height: 20),
            instagramField(),
            const SizedBox(height: 20),
            githubField(),
            const SizedBox(height: 20),
            linkedInField(),
            const SizedBox(height: 20),
            ElevatedButton(
                onPressed: () {
                  print('수정하기!');
                }
                // => uploadImageToBackend(_imageFile!)
                ,
                child: const Text('수정하기')),
          ],
        ),
      ),
    );
  }

  Widget imageProfile() {
    return Center(
        child: Stack(
      children: <Widget>[
        const CircleAvatar(
            radius: 80, backgroundImage: AssetImage('assets/MadCamp.png')),
        Positioned(
            bottom: 20,
            right: 20,
            child: InkWell(
              onTap: () {
                showModalBottomSheet(
                    context: context, builder: ((builder) => bottomSheet()));
              },
              child: const Icon(
                Icons.camera_alt,
                color: Colors.grey,
                size: 40,
              ),
            ))
      ],
    ));
  }

  Widget nicknameTextField() {
    return TextFormField(
      decoration: const InputDecoration(
          border: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.pink),
          ),
          focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(
              color: Colors.black,
              width: 2,
            ),
          ),
          prefixIcon: Icon(
            Icons.person,
            color: Colors.blueAccent,
          ),
          labelText: 'NickName',
          hintText: 'Input your nickname'),
    );
  }

  Widget instagramField() {
    return TextFormField(
      decoration: const InputDecoration(
          border: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.pink),
          ),
          focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(
              color: Colors.black,
              width: 2,
            ),
          ),
          prefixIcon: Icon(FontAwesomeIcons.instagram, color: Colors.pink),
          labelText: 'Instagram ID',
          hintText: 'Input your Instagram ID'),
    );
  }

  Widget githubField() {
    return TextFormField(
      decoration: const InputDecoration(
          border: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.pink),
          ),
          focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(
              color: Colors.black,
              width: 2,
            ),
          ),
          prefixIcon: Icon(FontAwesomeIcons.github, color: Colors.black),
          labelText: 'GitHub ID',
          hintText: 'Input your GitHub ID'),
    );
  }

  Widget linkedInField() {
    return TextFormField(
      decoration: const InputDecoration(
          border: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.pink),
          ),
          focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(
              color: Colors.black,
              width: 2,
            ),
          ),
          prefixIcon: Icon(FontAwesomeIcons.linkedin, color: Colors.blue),
          labelText: 'LinkedIn ID',
          hintText: 'Input your LinkedIn ID'),
    );
  }

  Widget bottomSheet() {
    return Container(
        height: 100,
        width: MediaQuery.of(context).size.width,
        margin: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
        child: Column(
          children: <Widget>[
            const Text(
              'Choose Profile photo',
              style: TextStyle(
                fontSize: 20,
              ),
            ),
            const SizedBox(
              height: 20,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                ElevatedButton.icon(
                  onPressed: () {
                    takePhoto(ImageSource.gallery);
                  },
                  icon: const Icon(Icons.photo_library, size: 50),
                  label: const Text('Gallery', style: TextStyle(fontSize: 20)),
                ),
              ],
            )
          ],
        ));
  }

  Future<void> takePhoto(ImageSource source) async {
    final pickedFile = await _picker.pickImage(source: source);
    if (pickedFile != null) {
      setState(() {
        _imageFile = File(pickedFile.path);
      });
      await uploadImageToBackend(_imageFile!);
    }
  }
}



// -----------------------------------------------------------

// import 'dart:io';

// import 'package:flutter/material.dart';
// import 'package:image_picker/image_picker.dart';
// import 'package:http/http.dart' as http;
// import 'package:font_awesome_flutter/font_awesome_flutter.dart';

// import 'package:flutter_dotenv/flutter_dotenv.dart';

// String? baseUrl = dotenv.env['BASE_URL'];

// class Profile2Page extends StatefulWidget {
//   const Profile2Page({super.key});

//   @override
//   State<Profile2Page> createState() => _Profile2PageState();
// }

// class _Profile2PageState extends State<Profile2Page> {
//   File? _imageFile;
//   final ImagePicker _picker = ImagePicker();

//   Future<void> uploadImageToBackend(File imageFile) async {
//     final url = Uri.parse('${baseUrl ??= 'http://localhost:8000'}/upload');
//     // final url = Uri.parse('http://172.10.5.118:443/upload');
//     final request = http.MultipartRequest('POST', url);
//     request.files
//         .add(await http.MultipartFile.fromPath('image', imageFile.path));

//     final response = await request.send();

//     if (response.statusCode == 200) {
//       print('이미지 업로드 성공');
//       // 이미지 업로드 성공
//       // TODO: 추가적인 처리 로직 작성
//     } else {
//       // 이미지 업로드 실패
//       // TODO: 에러 처리 로직 작성
//     }
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: const Text('Profile'),
//         elevation: 0.0,
//         backgroundColor: Colors.blueAccent,
//         centerTitle: true,
//       ),
//       body: Padding(
//         padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 20),
//         child: ListView(
//           children: <Widget>[
//             imageProfile(),
//             const SizedBox(height: 20),
//             const Row(
//               children: <Widget>[
//                 Icon(Icons.check_circle_outline),
//                 SizedBox(
//                   width: 10.0,
//                 ),
//                 Text(
//                   '이름: ',
//                   style: TextStyle(fontSize: 16.0, letterSpacing: 1.0),
//                 ),
//                 Text(
//                   '김태훈',
//                   style: TextStyle(fontSize: 16.0, letterSpacing: 1.0),
//                 )
//               ],
//             ),
//             const SizedBox(height: 20),
//             const Row(
//               children: <Widget>[
//                 Icon(Icons.check_circle_outline),
//                 SizedBox(
//                   width: 10.0,
//                 ),
//                 Text(
//                   '분반: ',
//                   style: TextStyle(fontSize: 16.0, letterSpacing: 1.0),
//                 ),
//                 Text(
//                   '1분반',
//                   style: TextStyle(fontSize: 16.0, letterSpacing: 1.0),
//                 )
//               ],
//             ),
//             const SizedBox(height: 20),
//             const Row(
//               children: <Widget>[
//                 Icon(Icons.check_circle_outline),
//                 SizedBox(
//                   width: 10.0,
//                 ),
//                 Text(
//                   '학교: ',
//                   style: TextStyle(fontSize: 16.0, letterSpacing: 1.0),
//                 ),
//                 Text(
//                   '성균관대학교',
//                   style: TextStyle(fontSize: 16.0, letterSpacing: 1.0),
//                 )
//               ],
//             ),
//             const SizedBox(height: 20),
//             const Row(
//               children: <Widget>[
//                 Icon(Icons.check_circle_outline),
//                 SizedBox(
//                   width: 10.0,
//                 ),
//                 Text(
//                   'KAIST 학번: ',
//                   style: TextStyle(fontSize: 16.0, letterSpacing: 1.0),
//                 ),
//                 Text(
//                   '20236231',
//                   style: TextStyle(fontSize: 16.0, letterSpacing: 1.0),
//                 )
//               ],
//             ),
//             const SizedBox(height: 20),
//             nicknameTextField(),
//             const SizedBox(height: 20),
//             instagramField(),
//             const SizedBox(height: 20),
//             githubField(),
//             const SizedBox(height: 20),
//             linkedInField(),
//             const SizedBox(height: 20),
//             ElevatedButton(
//                 onPressed: () {
//                   print('수정하기!');
//                 }
//                 // => uploadImageToBackend(_imageFile!)
//                 ,
//                 child: const Text('수정하기')),
//           ],
//         ),
//       ),
//     );
//   }

//   Widget imageProfile() {
//     return Center(
//         child: Stack(
//       children: <Widget>[
//         const CircleAvatar(
//             radius: 80, backgroundImage: AssetImage('assets/MadCamp.png')),
//         Positioned(
//             bottom: 20,
//             right: 20,
//             child: InkWell(
//               onTap: () {
//                 showModalBottomSheet(
//                     context: context, builder: ((builder) => bottomSheet()));
//               },
//               child: const Icon(
//                 Icons.camera_alt,
//                 color: Colors.grey,
//                 size: 40,
//               ),
//             ))
//       ],
//     ));
//   }

//   Widget nicknameTextField() {
//     return TextFormField(
//       decoration: const InputDecoration(
//           border: OutlineInputBorder(
//             borderSide: BorderSide(color: Colors.pink),
//           ),
//           focusedBorder: OutlineInputBorder(
//             borderSide: BorderSide(
//               color: Colors.black,
//               width: 2,
//             ),
//           ),
//           prefixIcon: Icon(
//             Icons.person,
//             color: Colors.blueAccent,
//           ),
//           labelText: 'NickName',
//           hintText: 'Input your nickname'),
//     );
//   }

//   Widget instagramField() {
//     return TextFormField(
//       decoration: const InputDecoration(
//           border: OutlineInputBorder(
//             borderSide: BorderSide(color: Colors.pink),
//           ),
//           focusedBorder: OutlineInputBorder(
//             borderSide: BorderSide(
//               color: Colors.black,
//               width: 2,
//             ),
//           ),
//           prefixIcon: Icon(FontAwesomeIcons.instagram, color: Colors.pink),
//           labelText: 'Instagram ID',
//           hintText: 'Input your Instagram ID'),
//     );
//   }

//   Widget githubField() {
//     return TextFormField(
//       decoration: const InputDecoration(
//           border: OutlineInputBorder(
//             borderSide: BorderSide(color: Colors.pink),
//           ),
//           focusedBorder: OutlineInputBorder(
//             borderSide: BorderSide(
//               color: Colors.black,
//               width: 2,
//             ),
//           ),
//           prefixIcon: Icon(FontAwesomeIcons.github, color: Colors.black),
//           labelText: 'GitHub ID',
//           hintText: 'Input your GitHub ID'),
//     );
//   }

//   Widget linkedInField() {
//     return TextFormField(
//       decoration: const InputDecoration(
//           border: OutlineInputBorder(
//             borderSide: BorderSide(color: Colors.pink),
//           ),
//           focusedBorder: OutlineInputBorder(
//             borderSide: BorderSide(
//               color: Colors.black,
//               width: 2,
//             ),
//           ),
//           prefixIcon: Icon(FontAwesomeIcons.linkedin, color: Colors.blue),
//           labelText: 'LinkedIn ID',
//           hintText: 'Input your LinkedIn ID'),
//     );
//   }

//   Widget bottomSheet() {
//     return Container(
//         height: 100,
//         width: MediaQuery.of(context).size.width,
//         margin: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
//         child: Column(
//           children: <Widget>[
//             const Text(
//               'Choose Profile photo',
//               style: TextStyle(
//                 fontSize: 20,
//               ),
//             ),
//             const SizedBox(
//               height: 20,
//             ),
//             Row(
//               mainAxisAlignment: MainAxisAlignment.spaceBetween,
//               children: <Widget>[
//                 ElevatedButton.icon(
//                   onPressed: () {
//                     takePhoto(ImageSource.gallery);
//                   },
//                   icon: const Icon(Icons.photo_library, size: 50),
//                   label: const Text('Gallery', style: TextStyle(fontSize: 20)),
//                 ),
//               ],
//             )
//           ],
//         ));
//   }

//   Future<void> takePhoto(ImageSource source) async {
//     final pickedFile = await _picker.pickImage(source: source);
//     if (pickedFile != null) {
//       setState(() {
//         _imageFile = File(pickedFile.path);
//       });
//       await uploadImageToBackend(_imageFile!);
//     }
//   }
// }
