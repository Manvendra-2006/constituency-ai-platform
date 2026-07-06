import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      backToDashboard: "Back to Dashboard",
      addComplaint: "Add New Complaint",
      shareConcern: "Share your concern and we will help you track it.",
      village: "Village",
      complaintDescription: "Complaint Description",
      startRecording: "Start Recording",
      stopRecording: "Stop Recording",
      clear: "Clear",
      listening: "Listening...",
      complaintPlaceholder: "Describe your complaint here or use voice recording",
      uploadImage: "Upload Image (Optional)",
      imageNote: "Upload an image along with complaint text. Image-only submission is not supported.",
      speechNotSupported: "Speech Recognition is not supported in this browser.",
      submitComplaint: "Submit Complaint",
      submitting: "Submitting...",
      villageRequired: "Village is required.",
      complaintRequired: "Please enter a complaint or upload an image.",
      submitSuccess: "Complaint submitted successfully.",
      submitFailed: "Unable to submit complaint.",
      complaintPreview: "Complaint preview",
      selectedImage: "Selected Image",
      yourComplaints: "Your Complaints",
      newComplaint: "New Complaint",
      unableToLoadComplaints: "Unable to load complaints.",
      mpDashboard: "MP Dashboard",
      mpSubtitle: "Review and act on citizen grievances",
      loadingComplaint: "Loading complaint details...",
      unableToLoadComplaint: "Unable to load complaint details.",
      unableToUpdateStatus: "Unable to update complaint status.",
      statusUpdated: "Complaint status updated successfully.",
      citizenDetails: "Citizen Details",
      citizenDetailsDesc: "Profile information tied to this grievance.",
      name: "Name",
      district: "District",
      complaintId: "Complaint ID",
      notAvailable: "Not Available",
      originalComplaint: "Original Complaint",
      originalComplaintDesc: "Citizen's submitted grievance text.",
      aiAnalysis: "AI Analysis",
      aiAnalysisDesc: "Structured insights generated for the complaint.",
      category: "Category",
      subcategory: "Subcategory",
      summary: "Summary",
      urgency: "Urgency",
      confidence: "Confidence",
      status: "Status",
      updateComplaintStatus: "Update Complaint Status",
      updateComplaintStatusDesc: "Assign a new disposition for this grievance.",
      new: "New",
      inProgress: "In Progress",
      resolved: "Resolved",
      rejected: "Rejected",
      updating: "Updating...",
      updateStatus: "Update Status",
      aiInsights: "AI Insights",
      aiInsightsSubtitle: "Gemini-powered civic intelligence",
      unableToLoadInsights: "Unable to load AI insights.",
      aiPoweredRecommendations: "AI-powered recommendations",
      insightsDescription:"Actionable guidance for priority grievances and hotspot areas.",
      topVillage: "Top Village",
      topCategory: "Top Category",
      highUrgencyComplaints: "High Urgency Complaints",
      aiRecommendation: "AI Recommendation",
      noRecommendation: "No recommendation available yet.",
      errorTitle: "We could not load this view",
      dashboard: "Dashboard",
      aiInsights: "AI Insights",
      logout: "Logout",
      user: "User",
      trackComplaints: "Track complaints in one place.",
      totalComplaints: "Total Complaints",
      pending: "Pending",
      analyzed: "Analyzed",
      needsAttention: "Needs Attention",
      aiReviewed: "AI Reviewed",
      acrossAllDistricts: "Across all districts",
  dashboard: "Dashboard",
  trackComplaints: "Track complaints in one place.",
  aiInsights: "AI Insights",
  logout: "Logout",
  user: "User",

  totalComplaints: "Total Complaints",
  analyzedComplaints: "Analyzed Complaints",
  pendingComplaints: "Pending Complaints",

  pending: "Pending",
  analyzed: "Analyzed",

  acrossAllDistricts: "Across All Districts",
  needsAttention: "Needs Attention",
  aiReviewed: "AI Reviewed",

  backToDashboard: "Back to Dashboard",
  addComplaint: "Add New Complaint",
  shareConcern: "Share your concern and we will help you track it.",
  village: "Village",
  complaintDescription: "Complaint Description",

  startRecording: "Start Recording",
  stopRecording: "Stop Recording",
  clear: "Clear",
  listening: "Listening...",

  complaintPlaceholder: "Describe your complaint here or use voice recording",

  uploadImage: "Upload Image (Optional)",
  imageNote:
    "Upload an image along with complaint text. Image-only submission is not supported.",

  speechNotSupported:
    "Speech Recognition is not supported in this browser.",

  submitComplaint: "Submit Complaint",
  submitting: "Submitting...",

  villageRequired: "Village is required.",
  complaintRequired: "Please enter your complaint.",
  submitSuccess: "Complaint submitted successfully.",
  submitFailed: "Unable to submit complaint.",

  complaintPreview: "Complaint Preview",
  selectedImage: "Selected Image",

  yourComplaints: "Your Complaints",
  newComplaint: "New Complaint",

  loading: "Loading...",
  loadingComplaint: "Loading complaint details...",

  errorTitle: "We could not load this view",

  citizenDetails: "Citizen Details",
  profileInformation: "Profile information tied to this grievance.",

  name: "Name",
  district: "District",
  complaintId: "Complaint ID",

  originalComplaint: "Original Complaint",
  originalComplaintDesc: "Citizen's submitted grievance text.",

  aiAnalysis: "AI Analysis",
  aiAnalysisDesc: "Structured insights generated for the complaint.",

  category: "Category",
  subcategory: "Subcategory",
  summary: "Summary",
  urgency: "Urgency",
  confidence: "Confidence",
  status: "Status",

  notAvailable: "Not Available",

  updateComplaintStatus: "Update Complaint Status",
  updateComplaintStatusDesc:
    "Assign a new disposition for this grievance.",

  updateStatus: "Update Status",
  updating: "Updating...",
  updateSuccess: "Complaint status updated successfully.",
  updateFailed: "Unable to update complaint status.",

  new: "New",
  inProgress: "In Progress",
  resolved: "Resolved",
  rejected: "Rejected",

  topVillage: "Top Village",
  topCategory: "Top Category",
  highUrgencyComplaints: "High Urgency Complaints",
  aiRecommendation: "AI Recommendation",
  aiPoweredRecommendations: "AI-powered recommendations",
  actionableGuidance:
    "Actionable guidance for priority grievances and hotspot areas.",
  noRecommendation: "No recommendation available yet.",

  mpDashboard: "MP Dashboard",
  reviewCitizen: "Review and act on citizen grievances",

  back: "Back",
  complaintId: "Complaint ID",
category: "Category",
status: "Status",
urgency: "Urgency",
confidence: "Confidence",
date: "Date",
action: "Action",
view: "View",
noComplaints: "No complaints found.",
subcategoryWiseComplaints: "Subcategory-wise Complaints",

recurringIssues: "Recurring Issues",
demandHotspots: "Demand Hotspots",
highestComplaintVillages: "Villages with Highest Complaints",
totalComplaintsLabel: "Total Complaints",
topIssue: "Top Issue",
highPriority: "High Priority",
mediumPriority: "Medium Priority",
lowPriority: "Low Priority",
subcategoryWiseComplaints: "Subcategory-wise Complaints",
villageWiseComplaints: "Village-wise Complaints",
topVillages: "Top villages with highest complaints",

categoryWiseComplaints: "Category-wise Complaints",
categoryDistribution: "Distribution of complaints by category",

loadingAnalytics: "Loading analytics...",

mpDashboard: "MP Dashboard",
mpDashboardSubtitle: "Monitor complaints and AI insights",
  mapDemandHotspot: "Map Demand Hotspot",
  viewProfile: "View Profile"

    }
  },
  hi: {
    translation: {
      backToDashboard: "डैशबोर्ड पर वापस जाएँ",
      addComplaint: "नई शिकायत दर्ज करें",
      shareConcern: "अपनी समस्या साझा करें, हम आपकी शिकायत ट्रैक करने में मदद करेंगे।",
      village: "गाँव",
      complaintDescription: "शिकायत विवरण",
      startRecording: "रिकॉर्डिंग शुरू करें",
      stopRecording: "रिकॉर्डिंग रोकें",
      clear: "साफ़ करें",
      listening: "सुन रहा है...",
      complaintPlaceholder: "अपनी शिकायत लिखें या आवाज़ से दर्ज करें",
      uploadImage: "छवि अपलोड करें (वैकल्पिक)",
      imageNote: "यदि आप छवि अपलोड करते हैं, तो शिकायत विवरण भी दर्ज करें।",
      speechNotSupported: "इस ब्राउज़र में स्पीच रिकॉग्निशन उपलब्ध नहीं है।",
      submitComplaint: "शिकायत दर्ज करें",
      submitting: "जमा किया जा रहा है...",
      villageRequired: "गाँव का नाम आवश्यक है।",
      complaintRequired: "कृपया शिकायत लिखें या छवि अपलोड करें।",
      submitSuccess: "शिकायत सफलतापूर्वक दर्ज हो गई।",
      submitFailed: "शिकायत दर्ज नहीं की जा सकी।",
      complaintPreview: "शिकायत पूर्वावलोकन",
      selectedImage: "चयनित छवि",
      yourComplaints: "आपकी शिकायतें",
      newComplaint: "नई शिकायत",
      unableToLoadComplaints: "शिकायतें लोड नहीं हो सकीं।",
      mpDashboard: "सांसद डैशबोर्ड",
      mpSubtitle: "नागरिक शिकायतों की समीक्षा करें और कार्रवाई करें",
      loadingComplaint: "शिकायत विवरण लोड हो रहा है...",
      unableToLoadComplaint: "शिकायत विवरण लोड नहीं किया जा सका।",
      unableToUpdateStatus: "शिकायत की स्थिति अपडेट नहीं की जा सकी।",
      statusUpdated: "शिकायत की स्थिति सफलतापूर्वक अपडेट हो गई।",
      citizenDetails: "नागरिक विवरण",
      citizenDetailsDesc: "इस शिकायत से जुड़ी प्रोफ़ाइल जानकारी।",
      name: "नाम",
      district: "ज़िला",
      complaintId: "शिकायत आईडी",
      notAvailable: "उपलब्ध नहीं",
      originalComplaint: "मूल शिकायत",
      originalComplaintDesc: "नागरिक द्वारा दर्ज की गई शिकायत।",
      aiAnalysis: "एआई विश्लेषण",
      aiAnalysisDesc: "शिकायत से संबंधित एआई द्वारा तैयार जानकारी।",
      category: "श्रेणी",
      subcategory: "उपश्रेणी",
      summary: "सारांश",
      urgency: "तत्कालता",
      confidence: "विश्वास स्तर",
      status: "स्थिति",
      updateComplaintStatus: "शिकायत की स्थिति अपडेट करें",
      updateComplaintStatusDesc: "इस शिकायत के लिए नई स्थिति निर्धारित करें।",
      new: "नई",
      inProgress: "प्रगति पर",
      resolved: "समाधान किया गया",
      rejected: "अस्वीकृत",
      updating: "अपडेट किया जा रहा है...",
      updateStatus: "स्थिति अपडेट करें",
      aiInsights: "एआई इनसाइट्स",
      aiInsightsSubtitle: "Gemini आधारित नागरिक विश्लेषण",
      unableToLoadInsights: "AI इनसाइट्स लोड नहीं हो सके।",
      aiPoweredRecommendations: "एआई आधारित सुझाव",
      insightsDescription: "प्राथमिक शिकायतों और अधिक प्रभावित क्षेत्रों के लिए उपयोगी सुझाव।",
      topVillage: "सबसे अधिक शिकायत वाला गाँव",
      topCategory: "सबसे प्रमुख श्रेणी",
      highUrgencyComplaints: "उच्च प्राथमिकता वाली शिकायतें",
      aiRecommendation: "एआई की सिफारिश",
      noRecommendation: "अभी कोई सिफारिश उपलब्ध नहीं है।",
      errorTitle: "यह पृष्ठ लोड नहीं किया जा सका",
      dashboard: "डैशबोर्ड",
      aiInsights: "एआई इनसाइट्स",
      viewProfile: "प्रोफ़ाइल देखें",
      logout: "लॉगआउट",
      user: "उपयोगकर्ता",
      trackComplaints: "सभी शिकायतों को एक ही स्थान पर ट्रैक करें।",
      totalComplaints: "कुल शिकायतें",
      pending: "लंबित",
      analyzed: "विश्लेषित",
      needsAttention: "ध्यान देने की आवश्यकता",
      aiReviewed: "AI द्वारा विश्लेषित",
      acrossAllDistricts: "सभी जिलों में",
  dashboard: "डैशबोर्ड",
  trackComplaints: "एक ही स्थान पर शिकायतों को ट्रैक करें।",
  aiInsights: "एआई विश्लेषण",
  logout: "लॉगआउट",
  user: "उपयोगकर्ता",

  totalComplaints: "कुल शिकायतें",
  analyzedComplaints: "विश्लेषित शिकायतें",
  pendingComplaints: "लंबित शिकायतें",

  pending: "लंबित",
  analyzed: "विश्लेषित",

  acrossAllDistricts: "सभी जिलों में",
  needsAttention: "ध्यान देने की आवश्यकता",
  aiReviewed: "AI द्वारा विश्लेषित",

  backToDashboard: "डैशबोर्ड पर वापस जाएँ",
  addComplaint: "नई शिकायत दर्ज करें",
  shareConcern:
    "अपनी समस्या साझा करें, हम आपकी शिकायत ट्रैक करने में मदद करेंगे।",

  village: "गाँव",
  complaintDescription: "शिकायत विवरण",

  startRecording: "रिकॉर्डिंग शुरू करें",
  stopRecording: "रिकॉर्डिंग रोकें",
  clear: "साफ़ करें",
  listening: "सुन रहा है...",

  complaintPlaceholder:
    "अपनी शिकायत लिखें या आवाज़ द्वारा दर्ज करें",

  uploadImage: "चित्र अपलोड करें (वैकल्पिक)",

  imageNote:
    "यदि चित्र अपलोड करते हैं तो शिकायत विवरण भी भरें। केवल चित्र स्वीकार नहीं है।",

  speechNotSupported:
    "इस ब्राउज़र में स्पीच रिकॉग्निशन उपलब्ध नहीं है।",

  submitComplaint: "शिकायत दर्ज करें",
  submitting: "जमा किया जा रहा है...",

  villageRequired: "गाँव का नाम आवश्यक है।",
  complaintRequired: "कृपया शिकायत दर्ज करें।",
  submitSuccess: "शिकायत सफलतापूर्वक दर्ज हो गई।",
  submitFailed: "शिकायत दर्ज नहीं हो सकी।",

  complaintPreview: "शिकायत पूर्वावलोकन",
  selectedImage: "चयनित चित्र",

  yourComplaints: "आपकी शिकायतें",
  newComplaint: "नई शिकायत",

  loading: "लोड हो रहा है...",
  loadingComplaint: "शिकायत विवरण लोड हो रहा है...",

  errorTitle: "यह पृष्ठ लोड नहीं हो सका",

  citizenDetails: "नागरिक विवरण",
  profileInformation: "इस शिकायत से जुड़ी प्रोफ़ाइल जानकारी।",

  name: "नाम",
  district: "जिला",
  complaintId: "शिकायत आईडी",

  originalComplaint: "मूल शिकायत",
  originalComplaintDesc: "नागरिक द्वारा दर्ज शिकायत।",

  aiAnalysis: "एआई विश्लेषण",
  aiAnalysisDesc: "शिकायत का AI द्वारा तैयार विश्लेषण।",

  category: "श्रेणी",
  subcategory: "उपश्रेणी",
  summary: "सारांश",
  urgency: "प्राथमिकता",
  confidence: "विश्वसनीयता",
  status: "स्थिति",

  notAvailable: "उपलब्ध नहीं",

  updateComplaintStatus: "शिकायत की स्थिति अपडेट करें",
  updateComplaintStatusDesc:
    "इस शिकायत के लिए नई स्थिति निर्धारित करें।",

  updateStatus: "स्थिति अपडेट करें",
  updating: "अपडेट हो रहा है...",
  updateSuccess: "शिकायत की स्थिति सफलतापूर्वक अपडेट हुई।",
  updateFailed: "शिकायत की स्थिति अपडेट नहीं हो सकी।",

  new: "नई",
  inProgress: "प्रगति पर",
  resolved: "समाधान हो गया",
  rejected: "अस्वीकृत",

  topVillage: "शीर्ष गाँव",
  topCategory: "शीर्ष श्रेणी",
  highUrgencyComplaints: "उच्च प्राथमिकता शिकायतें",
  aiRecommendation: "एआई सुझाव",
  aiPoweredRecommendations: "एआई आधारित सुझाव",
  actionableGuidance:
    "प्राथमिक शिकायतों और प्रभावित क्षेत्रों के लिए उपयोगी सुझाव।",
  noRecommendation: "अभी कोई सुझाव उपलब्ध नहीं है।",

  mpDashboard: "सांसद डैशबोर्ड",
  reviewCitizen: "नागरिक शिकायतों की समीक्षा करें और कार्रवाई करें।",

  back: "वापस",
  complaintId: "शिकायत आईडी",
category: "श्रेणी",
status: "स्थिति",
urgency: "तात्कालिकता",
confidence: "विश्वसनीयता",
date: "दिनांक",
action: "कार्य",
view: "देखें",
noComplaints: "कोई शिकायत नहीं मिली।",
subcategoryWiseComplaints: "उपश्रेणीवार शिकायतें",
recurringIssues: "बार-बार आने वाली समस्याएँ",
demandHotspots: "अधिक मांग वाले क्षेत्र",
highestComplaintVillages: "सबसे अधिक शिकायत वाले गाँव",
totalComplaintsLabel: "कुल शिकायतें",
topIssue: "मुख्य समस्या",
highPriority: "उच्च प्राथमिकता",
mediumPriority: "मध्यम प्राथमिकता",
lowPriority: "कम प्राथमिकता",
subcategoryWiseComplaints: "उपश्रेणीवार शिकायतें",
villageWiseComplaints: "गांववार शिकायतें",
topVillages: "सबसे अधिक शिकायत वाले गांव",
categoryWiseComplaints: "श्रेणीवार शिकायतें",
categoryDistribution: "शिकायतों का श्रेणी अनुसार वितरण",
loadingAnalytics: "एनालिटिक्स लोड हो रही है...",
mpDashboard: "सांसद डैशबोर्ड",
mpDashboardSubtitle: "शिकायतों और AI इनसाइट्स की निगरानी करें",
mapDemandHotspot: "मानचित्र मांग हॉटस्पॉट"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;