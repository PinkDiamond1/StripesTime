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
            {color: "#DED4C8"}, //champainish
            {color: "powderblue"},
            {color: "chocolate"},
            {color: "black"},
            {color: "darkorange"}
          ]}
        />
      </Section>
      <Section
        title={<Text bold align="center">Stripe Color</Text>}>
        <Toggle
          settingsKey="stripesToggle"
          label="Stripes On/Off"
        />
        <ColorSelect
          settingsKey="stripeColor"
          colors={[
            {color: "white"},
            {color: "black"},
            {color: "silver"},
            {color: "crimson"},
            {color: "lime"}
          ]}
        />
      </Section>
      <Section
        title={<Text bold align="center">Pin Stripe Color</Text>}>
        <Toggle
          settingsKey="pinStripesToggle"
          label="Pin Stripes On/Off"
        />
        <ColorSelect
          settingsKey="pinStripeColor"
          colors={[
            {color: "white"},
            {color: "black"},
            {color: "crimson"}
          ]}
        />
      </Section>
      <Section
        title={<Text bold align="center">Clock Color</Text>}>
        <ColorSelect
          settingsKey="clockColor"
          colors={[
            {color: "white"},
            {color: "black"},
            {color: "crimson"}
          ]}
        />
      </Section>
      <Section
        title={<Text bold align="center">Tach Color</Text>}>
        <ColorSelect
          settingsKey="tachColor"
          colors={[
            {color: "white"},
            {color: "dimgrey"}
          ]}
        />
      </Section>
   <Section
        title={<Text bold align="center">Contact Me</Text>}>
        <Text>
          Please don't hesitiate to contact me with questions or suggestions. This and all my other apps will always be free and Open Source. If you really like my app please considder buying me a coffee (or more likely electonic components that end up in my classroom). Thanks!
        </Text>
        <Link source="https://rawgit.com/cmspooner/StripesTime/master/settings/email.html">
          <TextImageRow
            label="Email"
            sublabel="cmspooner@gmail.com"
            icon="https://github.com/cmspooner/StripesTime/blob/master/resources/icons/settings/Email.png?raw=true"
          />
        </Link>
        <Link source="https://github.com/cmspooner">
          <TextImageRow
            label="Github"
            sublabel="https://github.com/cmspooner"
            icon="https://github.com/cmspooner/StripesTime/blob/master/resources/icons/settings/Github.png?raw=true"
          />
        </Link>
        <Link source="https://paypal.me/CMSpooner">
          <TextImageRow
            label="PayPal"
            sublabel="cmspooner@gmail.com"
            icon="https://github.com/cmspooner/StripesTime/blob/master/resources/icons/settings/Paypal.png?raw=true"
          />
        </Link>
      </Section>
      <Section
        title={<Text bold align="center">Build Version and Notes</Text>}>
        <Text>
          1.4.1:Added Bttery %
        </Text>
        <Text>
          1.4: Tap to change stats in odo
        </Text>
        <Text>
          1.3: Now with images for Speed and Odo
        </Text>
        <Text>
          1.2.3: Changed how stripes toggels work
        </Text>
        <Text>
          1.2.2: Pinstripes showing now?
        </Text>
        <Text>
          1.2.1: Pinstripes thicker
        </Text>
        <Text>
          1.2: Pinstripes thicker
        </Text>
        <Text>
          1.1: Lots of little fixes icluding fs writing
        </Text>
        <Text>
          1.0: First official release
        </Text>
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
