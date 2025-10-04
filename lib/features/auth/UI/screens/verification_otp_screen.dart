import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:nasa_app/core/utils/app_colors.dart';
import 'package:nasa_app/core/widgets/custom_toast.dart';
import 'package:nasa_app/features/auth/UI/screens/widget/custom_header.dart';
import 'package:pinput/pinput.dart';
import '../../../../core/utils/app_routers.dart';
import '../../../../core/widgets/custom_app_button.dart';
import '../manager/auth_cubit.dart';
import '../manager/auth_state.dart';

class VerificationOtpScreen extends StatefulWidget {
  final String email;

  const VerificationOtpScreen({super.key, required this.email});

  @override
  State<VerificationOtpScreen> createState() => _VerificationOtpScreenState();
}

class _VerificationOtpScreenState extends State<VerificationOtpScreen> {
  int _secondsRemaining = 30;
  Timer? _timer;
  String _otp = "";
  bool isWrite = false;

  @override
  void initState() {
    super.initState();
    _startTimer();
  }

  void _checkIfWrite(String value) {
    setState(() {
      isWrite = value.length == 6;
    });
  }

  void _startTimer() {
    _secondsRemaining = 30;
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_secondsRemaining == 0) {
        timer.cancel();
      } else {
        setState(() {
          _secondsRemaining--;
        });
      }
    });
  }

  void _verifyOtp() {
    if (_otp.length == 6) {
      context.read<AuthCubit>().verifyOtp(otp: _otp, email: widget.email);
    } else {
      CustomToast.showError(message: "Please enter the 6-digit OTP");
    }
  }

  @override
  Widget build(BuildContext context) {
    final defaultPinTheme = PinTheme(
      width: 56,
      height: 56,
      textStyle: const TextStyle(
        fontSize: 20,
        color: Colors.white,
        fontWeight: FontWeight.w600,
      ),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: Colors.grey),
      ),
    );

    return BlocConsumer<AuthCubit, AuthState>(
      listener: (context, state) {
        if (state is AuthFailure) {
          CustomToast.showError(message: state.errorMessage);
        } else if (state is AuthSuccess) {
          if (state.statusCode < 400) {
            context.pushReplacement(
              AppRouters.successAuth,
              extra: widget.email,
            );
          } else {
            CustomToast.showError(message: "Invalid OTP, please try again");
          }
        }
      },
      builder: (context, state) {
        final isLoading = state is AuthLoading;

        return Scaffold(
          body: Container(
            decoration: BoxDecoration(
              gradient: AppColors.firstScaffoldGradient,
            ),
            child: SafeArea(
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: 24.w, vertical: 16.h),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    CustomHeader(
                      title: "Check Your Email",
                      subTitle: "We've sent a 6-digit code to\n${widget.email}",
                      height: 120.h,
                    ),
                    SizedBox(height: 30.h),
                    Pinput(
                      length: 6,
                      defaultPinTheme: defaultPinTheme,
                      focusedPinTheme: defaultPinTheme.copyWith(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(color: Colors.blue),
                        ),
                      ),
                      submittedPinTheme: defaultPinTheme.copyWith(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(8),
                          color: Colors.blue.withAlpha(30),
                          border: Border.all(color: Colors.blue),
                        ),
                      ),
                      onChanged: (value) {
                        _otp = value;
                        _checkIfWrite(value);
                      },
                      onCompleted: (pin) {
                        _otp = pin;
                      },
                    ),
                    SizedBox(height: 30.h),
                    CustomAppButton(
                      onPressed: isWrite && !isLoading ? _verifyOtp : null,
                      text: isLoading
                          ? SizedBox(
                              width: 20.w,
                              height: 20.h,
                              child: CircularProgressIndicator(
                                color: Colors.white,
                                strokeWidth: 2,
                              ),
                            )
                          : const Text("Verify Code"),
                    ),
                    SizedBox(height: 10.h),
                    TextButton(
                      onPressed: (_secondsRemaining == 0)
                          ? () {
                              _startTimer();
                            }
                          : null,
                      child: Text(
                        _secondsRemaining == 0
                            ? "Resend Code"
                            : "Resend in $_secondsRemaining s",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: _secondsRemaining == 0
                              ? AppColors.primaryColor
                              : Colors.grey,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }
}
