import 'package:flutter/cupertino.dart';

class OnboardingPageModel {
  final String title;
  final String description;
  final IconData icon;
  final List<Color> gradientColors;

  OnboardingPageModel({
    required this.title,
    required this.description,
    required this.icon,
    required this.gradientColors,
  });
}
