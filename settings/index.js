const Settings = (props) => {
  return (
    <Page>
      <Section
        title={
          <Text bold align="center">
            Color Settings
          </Text>
        }
      >
        <ColorSelect
          settingsKey="bgColor"
          colors={[
            { color: "tomato" },
            { color: "sandybrown" },
            { color: "gold" },
            { color: "aquamarine" },
            { color: "deepskyblue" },
            { color: "plum" },
            { color: "white" },
            { color: "black" },
          ]}
        />
      </Section>
      <Section
        title={
          <Text bold align="center">
            Alarm Settings
          </Text>
        }
      >
        <TextInput label="Alarm text" settingsKey="alarmText" />
      </Section>
    </Page>
  );
};

registerSettingsPage(Settings);
