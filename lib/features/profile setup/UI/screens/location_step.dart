import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:nasa_app/features/profile%20setup/UI/screens/widget/custom_body_step.dart';

class LocationStep extends StatefulWidget {
  final TextEditingController locationController;
  final VoidCallback onUseCurrentLocation;

  const LocationStep({
    super.key,
    required this.locationController,
    required this.onUseCurrentLocation,
  });

  @override
  State<LocationStep> createState() => _LocationStepState();
}

class _LocationStepState extends State<LocationStep> {
  final List<Map<String, String>> _usStates = [
    {"name": "Alabama", "stateCode": "AL"},
    {"name": "Alaska", "stateCode": "AK"},
    {"name": "Arizona", "stateCode": "AZ"},
    {"name": "Arkansas", "stateCode": "AR"},
    {"name": "California", "stateCode": "CA"},
    {"name": "Colorado", "stateCode": "CO"},
    {"name": "Connecticut", "stateCode": "CT"},
    {"name": "Delaware", "stateCode": "DE"},
    {"name": "Florida", "stateCode": "FL"},
    {"name": "Georgia", "stateCode": "GA"},
    {"name": "Hawaii", "stateCode": "HI"},
    {"name": "Idaho", "stateCode": "ID"},
    {"name": "Illinois", "stateCode": "IL"},
    {"name": "Indiana", "stateCode": "IN"},
    {"name": "Iowa", "stateCode": "IA"},
    {"name": "Kansas", "stateCode": "KS"},
    {"name": "Kentucky", "stateCode": "KY"},
    {"name": "Louisiana", "stateCode": "LA"},
    {"name": "Maine", "stateCode": "ME"},
    {"name": "Maryland", "stateCode": "MD"},
    {"name": "Massachusetts", "stateCode": "MA"},
    {"name": "Michigan", "stateCode": "MI"},
    {"name": "Minnesota", "stateCode": "MN"},
    {"name": "Mississippi", "stateCode": "MS"},
    {"name": "Missouri", "stateCode": "MO"},
    {"name": "Montana", "stateCode": "MT"},
    {"name": "Nebraska", "stateCode": "NE"},
    {"name": "Nevada", "stateCode": "NV"},
    {"name": "New Hampshire", "stateCode": "NH"},
    {"name": "New Jersey", "stateCode": "NJ"},
    {"name": "New Mexico", "stateCode": "NM"},
    {"name": "New York", "stateCode": "NY"},
    {"name": "North Carolina", "stateCode": "NC"},
    {"name": "North Dakota", "stateCode": "ND"},
    {"name": "Ohio", "stateCode": "OH"},
    {"name": "Oklahoma", "stateCode": "OK"},
    {"name": "Oregon", "stateCode": "OR"},
    {"name": "Pennsylvania", "stateCode": "PA"},
    {"name": "Rhode Island", "stateCode": "RI"},
    {"name": "South Carolina", "stateCode": "SC"},
    {"name": "South Dakota", "stateCode": "SD"},
    {"name": "Tennessee", "stateCode": "TN"},
    {"name": "Texas", "stateCode": "TX"},
    {"name": "Utah", "stateCode": "UT"},
    {"name": "Vermont", "stateCode": "VT"},
    {"name": "Virginia", "stateCode": "VA"},
    {"name": "Washington", "stateCode": "WA"},
    {"name": "West Virginia", "stateCode": "WV"},
    {"name": "Wisconsin", "stateCode": "WI"},
    {"name": "Wyoming", "stateCode": "WY"},
    {"name": "District of Columbia", "stateCode": "DC"},
  ];

  Map<String, String>? _selectedState;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 22.w),
      child: CustomBodyStep(
        gradient: const [Color(0xFF00C6FF), Color(0xFF0072FF)],
        icon: Icons.location_on_outlined,
        title: "Where are you located?",
        subTitle: "Help us provide accurate local air quality data",
        body: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            DropdownButtonFormField<Map<String, String>>(
              decoration: InputDecoration(
                filled: true,
                fillColor: Colors.white.withValues(alpha: 0.1),
                hintText: "Select your state",
                hintStyle: const TextStyle(color: Colors.white70),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12.r),
                  borderSide: BorderSide.none,
                ),
              ),
              dropdownColor: Colors.black87,
              iconEnabledColor: Colors.white,
              value: _selectedState,
              items: _usStates.map((state) {
                return DropdownMenuItem(
                  value: state,
                  child: Text(
                    state["name"]!,
                    style: const TextStyle(color: Colors.white),
                  ),
                );
              }).toList(),
              onChanged: (value) {
                setState(() {
                  _selectedState = value;
                  widget.locationController.text = value?["stateCode"] ?? "";
                });
              },
            ),
            const SizedBox(height: 5),
            TextButton(
              onPressed: widget.onUseCurrentLocation,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: const [
                  Icon(Icons.location_on_outlined, color: Colors.white),
                  SizedBox(width: 3),
                  Text(
                    "Use Current Location",
                    style: TextStyle(color: Colors.white),
                  ),
                ],
              ),
            ),
          ],
        ),
        footer: "We'll use this to show you local air quality data and alerts",
      ),
    );
  }
}
