import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

class CustomToast {
  static void showError({required String message}) {
    String cleanMessage = message.replaceFirst(RegExp(r'\[.*?\]\s*'), '');
    Fluttertoast.showToast(
      msg: cleanMessage.trim(),
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
      backgroundColor: Colors.red,
      textColor: Colors.white,
      fontSize: 16.0,
    );
  }

  static void showSuccess({required String message}) {
    String cleanMessage = message.replaceFirst(RegExp(r'\[.*?\]\s*'), '');
    Fluttertoast.showToast(
      msg: cleanMessage.trim(),
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
      backgroundColor: Colors.green,
      textColor: Colors.white,
      fontSize: 16.0,
    );
  }

  static void otherMessage({
    required String message,
    required Color backgroundColor,
    required Color textColor,
  }) {
    String cleanMessage = message.replaceFirst(RegExp(r'\[.*?\]\s*'), '');
    Fluttertoast.showToast(
      msg: cleanMessage.trim(),
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
      backgroundColor: backgroundColor,
      textColor: textColor,
      fontSize: 16.0,
    );
  }
}
