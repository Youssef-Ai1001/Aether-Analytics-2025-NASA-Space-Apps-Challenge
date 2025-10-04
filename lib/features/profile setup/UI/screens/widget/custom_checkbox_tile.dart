import 'package:flutter/material.dart';

class CustomCheckboxTile extends StatelessWidget {
  final String title;
  final bool value;
  final Function(bool?) onChanged;

  const CustomCheckboxTile({
    super.key,
    required this.title,
    required this.value,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return CheckboxListTile(
      title: Text(title),
      value: value,
      onChanged: onChanged,
    );
  }
}
