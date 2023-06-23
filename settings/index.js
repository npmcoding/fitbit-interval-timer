const Settings = (props) => {
  return (
    <Page>
      <Section
        title={
          <Text bold align="center">
            Background Color Settings
          </Text>
        }
      >
        <ColorSelect
          settingsKey="bgColor"
          colors={[
            { color: "#E0E1E0" },
            { color: "#EFE30B" },
            { color: "#F99D1C" },
            { color: "#E3484A" },
            { color: "#A0DAE1" },
            { color: "#53B8A6" },
            { color: "#F9CF1E" },
            { color: "#FFFFFF" },
            { color: "#000000" },
          ]}
        />
      </Section>
      <Section
        title={
          <Text bold align="center">
            Alarm Color Settings
          </Text>
        }
      >
        <ColorSelect
          settingsKey="alarmColor"
          colors={[
            { color: "#E0E1E0" },
            { color: "#EFE30B" },
            { color: "#F99D1C" },
            { color: "#E3484A" },
            { color: "#A0DAE1" },
            { color: "#53B8A6" },
            { color: "#F9CF1E" },
            { color: "#FFFFFF" },
            { color: "#000000" },
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
