import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import '../../../../../core/utils/app_colors.dart';

class CustomTextField extends StatefulWidget {
  final String name;
  final String hintText;
  final IconData prefixIcon;
  final IconData? suffixIcon;
  final bool obscureText;
  final String? Function(String?)? validator;
  final TextInputType keyboardType;
  final Function(String?)? onChanged; // ⬅️ أضفنا callback

  const CustomTextField({
    super.key,
    required this.name,
    required this.hintText,
    required this.prefixIcon,
    this.suffixIcon,
    this.obscureText = false,
    this.validator,
    this.keyboardType = TextInputType.text,
    this.onChanged, // ⬅️ استقباله
  });

  @override
  State<CustomTextField> createState() => _CustomTextFieldState();
}

class _CustomTextFieldState extends State<CustomTextField> {
  late bool isObscure;

  @override
  void initState() {
    super.initState();
    isObscure = widget.obscureText;
  }

  @override
  Widget build(BuildContext context) {
    return FormBuilderTextField(
      name: widget.name,
      validator: widget.validator,
      obscureText: isObscure,
      keyboardType: widget.keyboardType,
      style: const TextStyle(color: Colors.white),

      autovalidateMode: AutovalidateMode.onUserInteraction,

      onChanged: (val) {
        // ✅ استدعاء الـ validator
        FormBuilder.of(context)?.fields[widget.name]?.validate();

        // ✅ استدعاء الكولباك اللي جاي من بره (زي _checkIfWrite)
        if (widget.onChanged != null) {
          widget.onChanged!(val);
        }
      },

      decoration: InputDecoration(
        hintText: widget.hintText,
        hintStyle: TextStyle(color: Colors.white.withValues(alpha: 0.6)),
        prefixIcon: Icon(
          widget.prefixIcon,
          color: Colors.white.withValues(alpha: 0.8),
        ),
        suffixIcon: widget.suffixIcon != null
            ? GestureDetector(
                onTap: () {
                  setState(() {
                    isObscure = !isObscure; // ✅ تبديل إظهار/إخفاء النص
                  });
                },
                child: Icon(
                  isObscure ? Icons.visibility : Icons.visibility_off,
                  color: Colors.white.withValues(alpha: 0.8),
                ),
              )
            : null,
        filled: true,
        fillColor: AppColors.textFieldFillColor,
        contentPadding: const EdgeInsets.symmetric(
          vertical: 16,
          horizontal: 20,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: Colors.white.withValues(alpha: 0.2)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: Colors.blue, width: 1.5),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: Colors.red, width: 1.5),
        ),
        focusedErrorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: Colors.redAccent, width: 1.5),
        ),
      ),
    );
  }
}
