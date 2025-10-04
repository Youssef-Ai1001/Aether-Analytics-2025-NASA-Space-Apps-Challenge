import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:nasa_app/core/utils/app_colors.dart';
import 'package:nasa_app/core/utils/app_routers.dart';
import 'package:nasa_app/core/utils/app_text_styles.dart';
import 'package:nasa_app/core/widgets/custom_onboarding_dots.dart';
import 'package:nasa_app/core/widgets/custom_toast.dart';
import '../../data/models/profile_setup_model.dart';
import '../manager/profile_setup_cubit.dart';
import '../manager/profile_setup_state.dart';
import 'location_step.dart';
import 'health_step.dart';
import 'username_step.dart';

class ProfileSetupOnboardingScreen extends StatefulWidget {
  final String email;

  const ProfileSetupOnboardingScreen({super.key, required this.email});

  @override
  State<ProfileSetupOnboardingScreen> createState() =>
      _ProfileSetupOnboardingScreenState();
}

class _ProfileSetupOnboardingScreenState
    extends State<ProfileSetupOnboardingScreen> {
  final PageController _pageController = PageController();
  int _currentIndex = 0;

  // Controllers
  final TextEditingController _locationController = TextEditingController();
  final TextEditingController _usernameController = TextEditingController();

  // State
  final Map<String, bool> _conditions = {
    "Asthma": false,
    "Elderly (65+)": false,
    "Children under 12": false,
    "Heart Conditions": false,
    "Respiratory Issues": false,
  };

  void _nextPage(BuildContext context) {
    if (_currentIndex < 2) {
      _pageController.nextPage(
        duration: const Duration(milliseconds: 400),
        curve: Curves.easeInOut,
      );
    } else {
      _finishSetup(context);
    }
  }

  void _prevPage() {
    if (_currentIndex > 0) {
      _pageController.previousPage(
        duration: const Duration(milliseconds: 400),
        curve: Curves.easeInOut,
      );
    }
  }

  void _finishSetup(BuildContext context) {
    final model = ProfileSetupModel(
      email: widget.email,
      location: _locationController.text,
      sensitive: _conditions.values.contains(true),
      username: _usernameController.text,
    );

    context.read<ProfileSetupCubit>().submitProfile(model);
  }

  @override
  Widget build(BuildContext context) {
    final bool isLastPage = _currentIndex == 2;

    return BlocListener<ProfileSetupCubit, ProfileSetupState>(
      listener: (context, state) {
        if (state is ProfileSetupLoading) {
          CustomToast.otherMessage(
            message: "⏳ Sending data...",
            backgroundColor: Colors.blueAccent.withValues(alpha: 0.5),
            textColor: Colors.white,
          );
        } else if (state is ProfileSetupSuccess) {
          CustomToast.showSuccess(message: "✅ Profile setup completed!");
          context.push(AppRouters.homeWrapper);
        } else if (state is ProfileSetupFailure) {
          CustomToast.showError(message: state.error);
        }
      },
      child: Scaffold(
        body: Container(
          decoration: BoxDecoration(gradient: AppColors.firstScaffoldGradient),
          child: SafeArea(
            child: Column(
              children: [
                // ✅ Progress dots
                CustomOnboardingDots(
                  currentIndex: _currentIndex,
                  count: 3,
                  isProgressMode: true,
                ),

                // ✅ Steps
                Expanded(
                  child: PageView(
                    controller: _pageController,
                    physics: const NeverScrollableScrollPhysics(),
                    onPageChanged: (index) {
                      setState(() => _currentIndex = index);
                    },
                    children: [
                      UsernameStep(usernameController: _usernameController),
                      LocationStep(
                        locationController: _locationController,
                        onUseCurrentLocation: () {
                          debugPrint("📍 Use current location clicked");
                        },
                      ),
                      HealthStep(
                        conditions: _conditions,
                        onConditionChanged: (condition, value) {
                          setState(() {
                            _conditions[condition] = value;
                          });
                        },
                      ),
                    ],
                  ),
                ),

                // ✅ Navigation buttons
                Padding(
                  padding: EdgeInsets.all(16.w),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      if (_currentIndex > 0)
                        InkWell(
                          onTap: _prevPage,
                          child: Text(
                            "Back",
                            style: AppTextStyles.button.copyWith(
                              fontSize: 14.sp,
                              color: Colors.white24,
                            ),
                          ),
                        )
                      else
                        const Spacer(),
                      ElevatedButton(
                        onPressed: () => _nextPage(context),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.teal,
                          foregroundColor: Colors.white,
                          textStyle: AppTextStyles.button.copyWith(
                            fontSize: 14.sp,
                          ),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                          padding: EdgeInsets.symmetric(
                            horizontal: 20.w,
                            vertical: 12.h,
                          ),
                        ),
                        child: Text(isLastPage ? "Finish" : "Next"),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
