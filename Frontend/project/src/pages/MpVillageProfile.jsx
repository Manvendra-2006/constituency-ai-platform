import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../api/axios";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const MpVillageProfile = () => {

    const { village } = useParams();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchVillage();
    }, [village]);

    const fetchVillage = async () => {
        try {
            const res = await apiClient.get(`/village/${village}`);
            setProfile(res.data);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;
    if (!profile) return null;

   const {
    villageData,
    complaints,
    totalComplaints,
    aiAnalysis,
} = profile;

    const infraRows = [
        ["Total Population", villageData.totalPopulation],
        ["Govt. Primary School", villageData.govtPrimarySchool],
        ["Govt. Middle School", villageData.govtMiddleSchool],
        ["Govt. Secondary School", villageData.govtSecondarySchool],
        ["Anganwadi Centre", villageData.anganwadiCentre],
        ["Primary Health Centre", villageData.primaryHealthCentre],
        ["Community Health Centre", villageData.communityHealthCentre],
        ["All-Weather Road", villageData.allWeatherRoad ? "Available" : "Not Available"],
        ["Domestic Power Supply", villageData.powerSupplyDomestic ? "Available" : "Not Available"],
    ];

    return (
        <div className="min-h-screen bg-[#F3F1EA] text-[#1A1A1A] font-serif">

            {/* Tricolor strip */}
            <div className="h-1.5 w-full flex">
                <div className="flex-1 bg-[#FF9933]" />
                <div className="flex-1 bg-white" />
                <div className="flex-1 bg-[#138808]" />
            </div>

            <Navbar title={villageData.villageName} subtitle="Village Profile" />

            {/* District administration strip, below navbar, centered */}
            <div className="bg-[#0B3D62]/5 border-b border-[#0B3D62]/20 py-3 text-center">
                <h2 className="text-base sm:text-lg font-bold text-[#0B3D62] uppercase tracking-wide">
                    District Administration, {villageData.districtName}
                </h2>
                <p className="text-xs text-[#5A5A5A] mt-0.5">
                    {villageData.subDistrictName} Sub-Division — Village Profile Record
                </p>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-8">

                {/* Title block, like a document heading */}
                <div className="border border-[#0B3D62]/30 bg-white">
                    <div className="bg-[#0B3D62]/5 border-b border-[#0B3D62]/30 px-5 py-3 flex items-center justify-between flex-wrap gap-2">
                        <div>
                            <h2 className="text-xl font-bold text-[#0B3D62] uppercase tracking-wide">
                                {villageData.villageName}
                            </h2>
                            <p className="text-xs text-[#5A5A5A]">
                                Village Code: {villageData._id.slice(-8).toUpperCase()}
                            </p>
                        </div>
                        <div className="text-right border border-[#8B1E23] px-3 py-1.5 bg-[#8B1E23]/5">
                            <p className="text-[10px] uppercase tracking-wide text-[#8B1E23]">
                                Registered Grievances
                            </p>
                            <p className="text-2xl font-bold text-[#8B1E23]">{totalComplaints}</p>
                        </div>
                    </div>

                    {/* Infrastructure table */}
                    <table className="w-full text-sm">
                        <tbody>
                            {infraRows.map(([label, value], idx) => (
                                <tr
                                    key={label}
                                    className={idx % 2 === 0 ? "bg-white" : "bg-[#0B3D62]/[0.03]"}
                                >
                                    <td className="px-5 py-2.5 border-t border-[#0B3D62]/10 text-[#3A3A3A] w-1/2">
                                        {label}
                                    </td>
                                    <td className="px-5 py-2.5 border-t border-[#0B3D62]/10 font-semibold text-[#0B3D62]">
                                        {value ?? "—"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                            {/* AI Development Analysis */}

<div className="mt-8">

    <div className="flex items-center gap-3 mb-3">
        <h3 className="text-base font-bold text-[#0B3D62] uppercase tracking-wide whitespace-nowrap">
            🤖 AI Development Analysis
        </h3>

        <div className="h-px bg-[#0B3D62]/30 flex-1" />
    </div>

    <div className="border border-[#0B3D62]/30 bg-white">

        <table className="w-full text-sm">

            <tbody>

                <tr>
                    <td className="px-5 py-3 border-t w-1/2">
                        Development Score
                    </td>

                    <td className="px-5 py-3 font-bold text-[#138808]">
                        {aiAnalysis?.developmentScore}/100
                    </td>
                </tr>

                <tr className="bg-[#0B3D62]/[0.03]">
                    <td className="px-5 py-3">
                        Major Issue
                    </td>

                    <td className="px-5 py-3">
                        {aiAnalysis?.majorIssue}
                    </td>
                </tr>

                <tr>
                    <td className="px-5 py-3">
                        Priority Level
                    </td>

                    <td className="px-5 py-3">
                        {aiAnalysis?.priority}
                    </td>
                </tr>

                <tr className="bg-[#0B3D62]/[0.03]">
                    <td className="px-5 py-3">
                        Recommendation
                    </td>

                    <td className="px-5 py-3">
                        {aiAnalysis?.recommendation}
                    </td>
                </tr>

                <tr>
                    <td className="px-5 py-3">
                        Future Suggestion
                    </td>

                    <td className="px-5 py-3">
                        {aiAnalysis?.futureSuggestion}
                    </td>
                </tr>

                <tr className="bg-[#0B3D62]/[0.03]">
                    <td className="px-5 py-3">
                        AI Summary
                    </td>

                    <td className="px-5 py-3">
                        {aiAnalysis?.summary}
                    </td>
                </tr>

            </tbody>

        </table>

        <div className="border-t border-[#0B3D62]/20 p-5">

            <h4 className="font-bold text-[#0B3D62] mb-3">
                Recommended Development Projects
            </h4>

            <ol className="list-decimal pl-5 space-y-2">

                {aiAnalysis?.top3Projects?.map((project, index) => (

                    <li key={index}>
                        {project}
                    </li>

                ))}

            </ol>

        </div>

    </div>

</div>
                {/* Complaints register */}
                <div className="mt-8">
                    <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-base font-bold text-[#0B3D62] uppercase tracking-wide whitespace-nowrap">
                            Grievance Register
                        </h3>
                        <div className="h-px bg-[#0B3D62]/30 flex-1" />
                    </div>

                    {complaints.length === 0 ? (
                        <p className="text-sm text-[#5A5A5A] italic border border-dashed border-[#0B3D62]/30 px-4 py-6 text-center bg-white">
                            No grievances have been recorded for this village.
                        </p>
                    ) : (
                        <div className="border border-[#0B3D62]/30 bg-white divide-y divide-[#0B3D62]/10">
                            {complaints.map((c, idx) => (
                                <div key={c._id} className="px-5 py-4">
                                    <div className="flex items-start justify-between gap-3 flex-wrap">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-wide text-[#5A5A5A]">
                                                Case No. {String(idx + 1).padStart(3, "0")} · {c.aiResponse?.category} / {c.aiResponse?.subcategory}
                                            </p>
                                            <p className="text-sm text-[#1A1A1A] mt-1">
                                                {c.originalComplaint}
                                            </p>
                                        </div>
                                        <span
                                            className={`text-[10px] font-bold uppercase px-2 py-1 border shrink-0 ${
                                                c.aiResponse?.urgency === "High"
                                                    ? "border-[#8B1E23] text-[#8B1E23] bg-[#8B1E23]/5"
                                                    : c.aiResponse?.urgency === "Medium"
                                                    ? "border-[#B8860B] text-[#B8860B] bg-[#B8860B]/5"
                                                    : "border-[#138808] text-[#138808] bg-[#138808]/5"
                                            }`}
                                        >
                                            {c.aiResponse?.urgency} Priority
                                        </span>
                                    </div>

                                    <p className="text-[11px] text-[#5A5A5A] mt-3 border-t border-dashed border-[#0B3D62]/15 pt-2">
                                        Status: <span className="font-semibold uppercase">{c.complaintStatus}</span>
                                        {"  ·  "}Filed on {new Date(c.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <p className="text-center text-[10px] text-[#5A5A5A] mt-8">
                    This is a system-generated record. For official use only.
                </p>

            </div>
        </div>
    );

};

export default MpVillageProfile;