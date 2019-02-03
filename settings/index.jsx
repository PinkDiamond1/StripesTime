function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Weather</Text>}>
        <Toggle
           settingsKey="unitToggle"
           label="US or Metric Units" 
           onChange={value => props.settingsStorage.setItem('unit', value.toString())}
        />
        <Text>Temperatures in degrees {props.settingsStorage.getItem('unit') == "true" ? "celsius" : "fahrenheit"}</Text>
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
        <Select
          label={`Backgound`}
          settingsKey="bgImage"
          options={[
            {name:"Color"},
            {name:"Union Jack"}
          ]}
         />
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
        title={<Text bold align="center">Stripes</Text>}>
        <Toggle
          settingsKey="stripesToggle"
          label="Stripes On/Off"
        />
        <Select
          label={`Stripes`}
          settingsKey="stripesImage"
          options={[
            {name:"Color"},
            {name:"Union Jack"},
            {name:"Monochrome Union Jack"}
          ]}
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
        title={<Text bold align="center">Pin Stripes</Text>}>
        <Toggle
          settingsKey="pinStripesToggle"
          label="Pin Stripes On/Off"
        />
        <Text>Pin Stripe Spacing (pixels): {props.settingsStorage.getItem('pss')}</Text>
        <Slider
           settingsKey="pinStripesSpacing"
           min="0"
           max="10"
           step="1"
           onChange={value => props.settingsStorage.setItem('pss', value)}
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
          Please don't hesitate to contact me with questions or suggestions; but be sure to let me know which app or watchface you are talking about. This and all my other apps will always be free and Open Source. If you really like my app please consider buying me a coffee (or more likely electronic components that end up in my classroom). Thanks!
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
        <Link source="https://openweathermap.org">
          <TextImageRow
            label="OpenWeatherMap"
            sublabel="Weather data provided by OpenWeatherMap.org"
            icon="https://github.com/cmspooner/StripesTime/blob/master/resources/icons/settings/OpenWeatherMap.png?raw=true"
          />
        </Link>
      </Section>
      <Section
        title={<Text bold align="center">Build Version and Notes</Text>}>
        <Text>
          3.4.1 Beta: Fix stripe color when showing image.
        </Text>
        <Text>
          3.4 Beta: Added better settings for Images and added monochrome stripes.
        </Text>
        <Text>
          3.3.1 Beta: Fixed Heart Rate...
        </Text>
        <Text>
          3.3 Beta: Union Jack Stripes
        </Text>
        <Text>
          3.2.1 Beta: Fixed haze Icon
        </Text>
        <Text>
          3.2 Beta: Union Jack Option
        </Text>
        <Text>
          3.1 Beta: Fix Weather and Layout
        </Text>
        <Text>
          3.0 Beta: More memory efficient!
        </Text>
        <Text>
          2.5.1 Beta: Fighting with weather not loading on review.
        </Text>
        <Text>
          2.5 Beta: Fighting with weather not loading on review.
        </Text>
        <Text>
          2.4.4.3 Beta: Add circles at bottom of both pinStripe
        </Text>
        <Text>
          2.4.4.2 Beta: Add circles at bottom of both pinStripe
        </Text>
        <Text>
          2.4.4.1 Beta: Add circle at bottom of pinStripe
        </Text>
        <Text>
          2.4.4 Beta: Addcircle at bottom of pinStripe
        </Text>
        <Text>
          2.4.3 Beta: Ionic Adjustments 3
        </Text>
        <Text>
          2.4.2 Beta: Ionic Adjustments 2
        </Text>
        <Text>
          2.4.1 Beta: Ionic Adjustments
        </Text>
        <Text>
          2.4 Beta: New Stripes Options
        </Text>
        <Text>
          2.3.3 Beta: Settings now shows units
        </Text>
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
