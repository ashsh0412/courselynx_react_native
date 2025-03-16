import HeaderLogo from "@/components/HeaderComponents/HeaderLogo";
import TabSelector from "@/components/TabSelector";
import { useState } from "react";
import DirectChatTab from "./direct";
import GroupChatTab from "./group";

export default function AddChatScreen() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <HeaderLogo
      title="Let's get chatting"
      subtitle="Select one of the two tabs and search the contact(s) to get started"
    >
      <TabSelector
        options={['Direct Chat', 'Group Chat']}
        selected={selectedTab}
        onSelect={setSelectedTab}
      />
      {selectedTab ? <GroupChatTab /> : <DirectChatTab />}
    </HeaderLogo>
  );
};