function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Weather</Text>}>
        <Toggle
           settingsKey="unitToggle"
           label="Tempterature in °F or °C"
         />
        <Select
          label={`Weather Update Interval`}
          settingsKey="updateInterval"
          options={[
            {name:"15 minutes"},
            {name:"30 minutes"},
            {name:"1 hour"},
            {name:"2 hours"},
          ]}
         />
        <Text align="center">
          Decreasing this will use more WATCH battery. 
        </Text>
        <Select
          label={`Location Update Interval`}
          settingsKey="locationUpdateInterval"
          options={[
            {name:"15 minutes"},
            {name:"30 minutes"},
            {name:"1 hour"},
            {name:"2 hours"},
          ]}
         />
         <Text align="center">
           Decreasing this will use more PHONE battery.
         </Text>
      </Section>
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
          Please don't hesitiate to contact me with questions or suggestions; but be sure to let me know which app or watchface you are talking about. This and all my other apps will always be free and Open Source. If you really like my app please considder buying me a coffee (or more likely electonic components that end up in my classroom). Thanks!
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
          2.3.2 Beta: Added bg for Ionic
        </Text>
        <Text>
          2.3.1 Beta: Added Square to Versa Temp
        </Text>
        <Text>
          2.3 Beta: Fixed night Icons
        </Text>
        <Text>
          2.2 Beta: Stupid Javascript doesn't catch typos!
        </Text>
        <Text>
          2.1 Beta: Forgot to set Interval for weather
        </Text>
        <Text>
          2.0 Beta: Now With Weather
        </Text>
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
