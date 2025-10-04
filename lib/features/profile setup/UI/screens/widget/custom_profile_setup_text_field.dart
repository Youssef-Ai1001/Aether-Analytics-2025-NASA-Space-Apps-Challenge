import 'package:flutter/material.dart';

class CustomProfileSetupTextField extends StatelessWidget {
  final String hint;
  final TextEditingController controller;
  final bool obscureText;

  const CustomProfileSetupTextField({
    super.key,
    required this.hint,
    required this.controller,
    this.obscureText = false,
  });

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      obscureText: obscureText,
      decoration: InputDecoration(
        hintText: hint,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
    );
  }
}
