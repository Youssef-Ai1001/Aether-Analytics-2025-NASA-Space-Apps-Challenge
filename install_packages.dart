/*
import 'dart:io';

Future<void> main() async {
  final packages = [
    "flutter_launcher_icons",
    "flutter_screenutil",
    "flutter_animate",
    "flutter_bloc",
    "get_it",
    "shared_preferences",
    "path_provider",
    "dio",
    "go_router",
    "flutter_svg",
    "dartz",
    "smooth_page_indicator",
    // Firebase
    "firebase_core",
    "cloud_firestore",
    "firebase_storage",
    "firebase_messaging",
    "firebase_auth",
    "flutter_form_builder",
    "equatable",
    "fluttertoast",
    "firebase_app_check",
  ];

  for (final package in packages) {
    print("⬇️ Installing $package ...");
    final result = await Process.run("C:\\src\\flutter\\bin\\flutter.bat", [
      "pub",
      "add",
      package,
    ]);

    if (result.exitCode == 0) {
      print("✅ Installed $package");
    } else {
      print("❌ Failed to install $package");
      print(result.stderr);
    }
  }

  print("\n🎉 All done!");
}
*/
