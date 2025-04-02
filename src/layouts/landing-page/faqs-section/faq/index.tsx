import { Accordion } from "@chakra-ui/react";

type FAQItemProps = {
  question: string;
  answer: string;
};

const FAQItem = ({ question, answer }: FAQItemProps) => (
  <Accordion.Item
    border="1px solid"
    borderColor="#F8F8F8"
    borderRadius="15px"
    py={2}
    value={question}
    bg="white"
  >
    <Accordion.ItemTrigger
      py={4}
      px={6}
      borderRadius="lg"
      fontSize={{ base: "12px", md: "16px", lg: "20px" }}
      lineHeight={1.2}
      _expanded={{ fontWeight: "bold" }}
      justifyContent="space-between"
    >
      {question}
      <Accordion.ItemIndicator />
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>
      <Accordion.ItemBody
        py={2}
        px={6}
        color="grey"
        fontSize={{ base: "12px", md: "14px", lg: "18px" }}
        textAlign="start"
      >
        {answer}
      </Accordion.ItemBody>
    </Accordion.ItemContent>
  </Accordion.Item>
);

type FAQListProps = {
  faqs: FAQItemProps[];
};

const FAQList = ({ faqs }: FAQListProps) => (
  <Accordion.Root collapsible spaceY={5} flex={1.3}>
    {faqs.map((faq, index) => (
      <FAQItem key={index} {...faq} />
    ))}
  </Accordion.Root>
);

const FAQs = () => {
  const faqs = [
    {
      question: "How does Growe help me save and invest?",
      answer:
        "Growe provides flexible savings plans and high-yield investment opportunities, allowing you to build wealth effortlessly. You can save individually, invest in diverse asset classes, or join group savings & investment plans for bigger opportunities.",
    },
    {
      question: "Is my money safe with Growe?",
      answer:
        "Absolutely! Growe uses bank-grade encryption, partners with trusted financial institutions, and complies with regulatory standards to ensure your funds are secure. Plus, your savings and investments are protected against unauthorized access.",
    },
    {
      question: "What’s the minimum amount I can start with?",
      answer:
        "You can start saving and investing with as little as ₦1,000. Our platform is designed to be accessible for everyone, whether you're a first-time saver or an experienced investor.",
    },
    {
      question: "How fast can I withdraw my savings or investment returns?",
      answer:
        "Savings withdrawals are processed instantly, while investment payouts depend on the plan’s maturity date. Group savings and investments follow the agreed payout schedule set by members.",
    },
  ];

  return <FAQList faqs={faqs} />;
};

export default FAQs;
