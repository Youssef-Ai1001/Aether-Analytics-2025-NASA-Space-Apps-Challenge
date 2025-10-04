import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:nasa_app/core/widgets/custom_app_button.dart';
import 'package:nasa_app/core/widgets/custom_toast.dart';
import 'package:nasa_app/features/auth/UI/screens/widget/custom_text_field.dart';
import '../../../../../core/utils/app_routers.dart';
import '../../manager/auth_cubit.dart';
import '../../manager/auth_state.dart';

class AuthForm extends StatefulWidget {
  const AuthForm({super.key});

  @override
  State<AuthForm> createState() => _AuthFormState();
}

class _AuthFormState extends State<AuthForm> {
  final _formKey = GlobalKey<FormBuilderState>();
  bool isWrite = false;

  void _checkIfWrite() {
    final email = _formKey.currentState?.fields['email']?.value ?? "";
    setState(() {
      isWrite = email.toString().isNotEmpty;
    });
  }

  void sendCode() {
    final formState = _formKey.currentState!;
    formState.save();
    final formData = formState.value;

    if (!formState.validate()) return;

    // استدعاء authenticate من الكيوبت
    context.read<AuthCubit>().authenticate(email: formData['email']);
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<AuthCubit, AuthState>(
      listener: (context, state) {
        if (state is AuthFailure) {
          CustomToast.showError(message: state.errorMessage);
        } else if (state is AuthSuccess) {
          final formData = _formKey.currentState!.value;
          final email = formData['email'];

          if (state.statusCode < 400) {
            // Login ناجح → نروح على الهوم
            context.pushReplacement(AppRouters.homeWrapper);
          } else {
            // Signup → نروح على صفحة OTP
            context.push(AppRouters.verificationOtp, extra: email);
          }
        }
      },
      builder: (context, state) {
        final isLoading = state is AuthLoading;

        return FormBuilder(
          key: _formKey,
          child: Column(
            children: [
              CustomTextField(
                name: "email",
                hintText: "Enter your email address",
                prefixIcon: Icons.mail,
                onChanged: (_) => _checkIfWrite(),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return "Email can't be empty";
                  }
                  if (!RegExp(r'^[^@]+@[^@]+\.[^@]+').hasMatch(value)) {
                    return "Enter a valid email";
                  }
                  return null;
                },
              ),
              SizedBox(height: 14.h),
              CustomAppButton(
                onPressed: isWrite && !isLoading ? sendCode : null,
                text: isLoading
                    ? SizedBox(
                        width: 20.w,
                        height: 20.h,
                        child: CircularProgressIndicator(
                          color: Colors.white,
                          strokeWidth: 2,
                        ),
                      )
                    : const Text("Continue with Email"),
              ),
            ],
          ),
        );
      },
    );
  }
}
