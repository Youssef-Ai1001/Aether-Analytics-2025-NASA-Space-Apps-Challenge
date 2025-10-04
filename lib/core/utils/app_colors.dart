import 'package:flutter/material.dart';

abstract class AppColors {
  static const Color primaryColor = Color(0xFF00bba7);
  static const Color secondaryColor = Color(0xFF1e2939);

  static const LinearGradient firstScaffoldGradient = LinearGradient(
    colors: [Color(0xFF101728), Color(0xFF1b388b), Color(0xFF101728)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
  static const Color secondScaffoldGradient = Color(0xFF101828);

  /*static const LinearGradient secondScaffoldGradient = LinearGradient(
    colors: [Color(0xFF101728), Color(0xFF1b388b)],
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
  );*/

  static const Color textFieldFillColor = Color(0xFF222a3d);
}
