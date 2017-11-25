function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Background Color</Text>}>
        <ColorSelect
          settingsKey="bgcolor"
          colors={[
            {color: "crimson"},
            {color: "deepskyblue"},
            {color: "darkgreen"},
            {color: "cornsilk"},
            {color: "darkblue"},
            {color: "black"}
          ]}
        />
      </Section>
      <Section
        title={<Text bold align="center">Stripe Color</Text>}>
        <ColorSelect
          settingsKey="stripeColor"
          colors={[
            {color: "white"},
            {color: "black"},
            {color: "silver"}
          ]}
        />
      </Section>
      <Section
        title={<Text bold align="center">Clock Color</Text>}>
        <ColorSelect
          settingsKey="clockColor"
          colors={[
            {color: "white"},
            {color: "black"}
          ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
