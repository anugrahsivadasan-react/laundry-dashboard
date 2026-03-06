import React, { useState } from "react";
import { File, Save } from "lucide-react";



interface FAQItem {
  question: string;
  answer: string;
}

const CSMpages: React.FC = () => {
  const [aboutTitle, setAboutTitle] = useState("About Juggle Laundry");
  const [aboutContent, setAboutContent] = useState(
    "We are your trusted laundry service provider..."
  );

  const [termsTitle, setTermsTitle] = useState("Terms and Conditions");
  const [termsContent, setTermsContent] = useState(
    "By using our services, you agree to..."
  );

  const [privacyTitle, setPrivacyTitle] = useState("Privacy Policy");
  const [privacyContent, setPrivacyContent] = useState(
    "We respect your privacy and are committed to..."
  );

  const [faqTitle, setFaqTitle] = useState("Frequently Asked Questions");

  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      question: "How long does it take?",
      answer: "Typically 24–48 hours."
    },
    {
      question: "Do you offer pickup?",
      answer: "Yes, we offer free pickup."
    }
  ]);

  const addFAQ = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const updateFAQ = (index: number, field: string, value: string) => {
    const updated = [...faqs];
    if (field === "question") updated[index].question = value;
    if (field === "answer") updated[index].answer = value;
    setFaqs(updated);
  };

  const saveAbout = async () => {
    await axios.post(`${BASE_URL}/about`, {
      title: aboutTitle,
      content: aboutContent
    });
  };

  const saveTerms = async () => {
    await axios.post(`${BASE_URL}/terms`, {
      title: termsTitle,
      content: termsContent
    });
  };

  const savePrivacy = async () => {
    await axios.post(`${BASE_URL}/privacy`, {
      title: privacyTitle,
      content: privacyContent
    });
  };

  const saveFAQ = async () => {
    await axios.post(`${BASE_URL}/faq`, {
      title: faqTitle,
      items: faqs
    });
  };

  return (
    <div className="min-h-screen bg-[#0b0b0c] text-white p-8">
      <div className="grid grid-cols-2 gap-6">

        {/* ABOUT */}
        <div className="bg-[#111214] p-6 rounded-xl border border-[#1f1f1f]">
          <p className="flex text-[16px] leading-[16px] text-gray-300 mb-4 gap-1"> <File size={16}/> About Us</p>

          <label className="text-xs text-gray-400">Page Title</label>
          <input
            value={aboutTitle}
            onChange={(e) => setAboutTitle(e.target.value)}
            className="w-full mt-1 mb-4 p-2 rounded bg-[#1a1b1e] border border-[#2a2a2a]"
          />

          <label className="text-xs text-gray-400">Content</label>
          <textarea
            value={aboutContent}
            onChange={(e) => setAboutContent(e.target.value)}
            className="w-full mt-1 mb-4 p-2 rounded bg-[#1a1b1e] border border-[#2a2a2a]"
          />

          <button
            onClick={saveAbout}
            className="flex justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 p-2 rounded text-sm"
          >
           <Save /> Save Changes
          </button>
        </div>

        {/* FAQ */}
        <div className="bg-[#111214] p-6 rounded-xl border border-[#1f1f1f]">
          <h2 className="text-sm text-gray-300 mb-4">FAQ</h2>

          <label className="text-xs text-gray-400">Page Title</label>
          <input
            value={faqTitle}
            onChange={(e) => setFaqTitle(e.target.value)}
            className="w-full mt-1 mb-4 p-2 rounded bg-[#1a1b1e] border border-[#2a2a2a]"
          />

          <label className="text-xs text-gray-400 mb-2 block">FAQ Items</label>

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#1a1b1e] border border-[#2a2a2a] rounded mb-3 p-3"
            >
              <input
                placeholder="Q:"
                value={faq.question}
                onChange={(e) =>
                  updateFAQ(index, "question", e.target.value)
                }
                className="w-full mb-2 bg-transparent outline-none"
              />

              <input
                placeholder="A:"
                value={faq.answer}
                onChange={(e) =>
                  updateFAQ(index, "answer", e.target.value)
                }
                className="w-full bg-transparent outline-none"
              />
            </div>
          ))}

          <button
            onClick={addFAQ}
            className="w-full bg-gray-700 hover:bg-gray-600 p-2 rounded mb-3 text-sm"
          >
            + Add New FAQ
          </button>

          <button
            onClick={saveFAQ}
            className="flex justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 p-2 rounded text-sm"
          >
           <Save /> Save Changes
          </button>
        </div>

        {/* TERMS */}
        <div className="bg-[#111214] p-6 rounded-xl border border-[#1f1f1f]">
          <h2 className="text-sm text-gray-300 mb-4">Terms & Conditions</h2>

          <label className="text-xs text-gray-400">Page Title</label>
          <input
            value={termsTitle}
            onChange={(e) => setTermsTitle(e.target.value)}
            className="w-full mt-1 mb-4 p-2 rounded bg-[#1a1b1e] border border-[#2a2a2a]"
          />

          <label className="text-xs text-gray-400">Content</label>
          <textarea
            value={termsContent}
            onChange={(e) => setTermsContent(e.target.value)}
            className="w-full mt-1 mb-4 p-2 rounded bg-[#1a1b1e] border border-[#2a2a2a]"
          />

          <button
            onClick={saveTerms}
            className="flex justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 p-2 rounded text-sm"
          >
           <Save /> Save Changes
          </button>
        </div>

        {/* PRIVACY */}
        <div className="bg-[#111214] p-6 rounded-xl border border-[#1f1f1f]">
          <h2 className="text-sm text-gray-300 mb-4">Privacy Policy</h2>

          <label className="text-xs text-gray-400">Page Title</label>
          <input
            value={privacyTitle}
            onChange={(e) => setPrivacyTitle(e.target.value)}
            className="w-full mt-1 mb-4 p-2 rounded bg-[#1a1b1e] border border-[#2a2a2a]"
          />

          <label className="text-xs text-gray-400">Content</label>
          <textarea
            value={privacyContent}
            onChange={(e) => setPrivacyContent(e.target.value)}
            className="w-full mt-1 mb-4 p-2 rounded bg-[#1a1b1e] border border-[#2a2a2a]"
          />

          <button
            onClick={savePrivacy}
            className="flex justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 p-2 rounded text-sm"
          >
           <Save /> Save Changes
          </button>
        </div>

      </div>
    </div>
  );
};

export default CSMpages;