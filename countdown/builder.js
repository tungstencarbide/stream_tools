"use strict";
const e = React.createElement;
const baseUrl = "https://aminorgames.com/stream_tools/countdown/";

const DateTimePicker = ({ dateTime, setDateTime }) => {
  const label = e(
    "h2",
    null,
    e("label", { htmlFor: "datetime" }, "Ending date/time")
  );
  const picker = e(Datetime, {
    value: dateTime,
    onChange: setDateTime,
    inputProps: {
      id: "datetime",
    },
  });
  return e("div", { className: "col-lg-6" }, label, picker);
};

const TimeZoneInput = ({ timeZone, setTimeZone }) => {
  const label = e("h2", null, e("label", { htmlFor: "timezone" }, "Time zone"));
  const input = e("input", {
    value: timeZone,
    onChange: (e) => setTimeZone(e.target.value),
    id: "timezone",
    style: {
      width: "100%",
    },
  });
  return e("div", { className: "col-lg-6" }, label, input);
};

const MessageInput = ({ message, setMessage }) => {
  const label = e(
    "h2",
    null,
    e("label", { htmlFor: "message" }, "Header message")
  );
  const input = e("input", {
    value: message,
    onChange: (e) => setMessage(e.target.value),
    id: "message",
    style: {
      width: "100%",
    },
  });
  return e("div", { className: "col-lg-6" }, label, input);
};

const FontInput = ({ font, setFont }) => {
  const label = e(
    "h2",
    null,
    e(
      "label",
      { htmlFor: "font" },
      "Font (from ",
      e(
        "a",
        { href: "https://fonts.google.com/", target: "_blank" },
        "Google Fonts"
      ),
      ")"
    )
  );
  const input = e("input", {
    value: font,
    onChange: (e) => setFont(e.target.value),
    id: "font",
    style: {
      width: "100%",
    },
  });
  return e("div", { className: "col-lg-6" }, label, input);
};

const Form = ({
  dateTime,
  setDateTime,
  timeZone,
  setTimeZone,
  message,
  setMessage,
  font,
  setFont,
}) => {
  const dtPicker = e(DateTimePicker, { dateTime, setDateTime });
  const tzInput = e(TimeZoneInput, { timeZone, setTimeZone });
  const messageInput = e(MessageInput, { message, setMessage });
  const fontInput = e(FontInput, { font, setFont });

  return e(
    "div",
    { className: "row" },
    dtPicker,
    tzInput,
    messageInput,
    fontInput
  );
};

const UrlDisplay = ({ url }) => {
  return e(
    "div",
    { className: "row" },
    e(
      "div",
      { className: "col-lg-12" },
      e("h1", null, "Your timer's URL is"),
      e("p", null, e("a", { href: url, target: "_blank" }, url))
    )
  );
};

const PreviewDisplay = ({ url }) => {
  return e(
    "div",
    { className: "row" },
    e(
      "div",
      { className: "col-lg-12" },
      e("h1", null, "Preview"),
      e("iframe", { src: url, style: { width: "100%", height: "400px" } })
    )
  );
};

const App = () => {
  const defaultTime = moment().startOf("hour").add(3, "hours");

  const [dateTime, setDateTime] = React.useState(defaultTime);
  const [timeZone, setTimeZone] = React.useState("MST");
  const [message, setMessage] = React.useState("Show will commence in");
  const [font, setFont] = React.useState("Orbitron");

  const formatTime = `${dateTime.format("MMM D, YYYY HH:mm:ss")} ${timeZone}`;
  const encodeTime = encodeURIComponent(formatTime);
  const encodeMessage = encodeURIComponent(message);
  const encodeFont = encodeURIComponent(font);

  const url = `${baseUrl}?endtime=${encodeTime}&headtext=${encodeMessage}&font=${encodeFont}`;

  return e(
    React.Fragment,
    null,
    e("h1", null, "Build your Countdown Timer"),
    e(Form, {
      dateTime,
      setDateTime,
      timeZone,
      setTimeZone,
      message,
      setMessage,
      font,
      setFont,
    }),
    e("br"),
    e(UrlDisplay, { url }),
    e(PreviewDisplay, { url })
  );
};

ReactDOM.render(e(App), document.getElementById("app"));
