/*
import 'dart:io';

void main(List<String> args) {
  if (args.isEmpty) {
    print(
      'Please provide a screen name.\nUsage: dart folder_structure.dart <screen_name>',
    );
    return;
  }

  final screenName = args[0].toLowerCase();
  final basePath = "lib/";
  final corePath = "core/";
  final featuresPath = "features/";

  final folders = [
    '$basePath/$corePath/utils',
    // '$basePath/$corePath/services',
    '$basePath/$corePath/widgets',
    '$basePath/$featuresPath/$screenName/data/models',
    '$basePath/$featuresPath/$screenName/data/repo',
    '$basePath/$featuresPath/$screenName/UI/manager',
    '$basePath/$featuresPath/$screenName/UI/screens/widget',
  ];

  for (var folder in folders) {
    final dir = Directory(folder);
    if (!dir.existsSync()) {
      dir.createSync(recursive: true);
      print('✔ Created: ${dir.path}');
    } else {
      print('A Already exists: ${dir.path}');
    }
  }

  print('\n Done setting up "$screenName" structure!');
}
*/
