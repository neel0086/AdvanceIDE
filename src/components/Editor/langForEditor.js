const langForEditor = (lang) => {
  switch (lang) {
    case lang === "python3" || lang === "python2":
      return "python";
    case lang === "java":
      return "java";
    case lang === "c" || lang === "cpp" || lang === "cpp14" || lang === "cpp17":
      return "c_pp";
    case lang === "ruby":
      return "ruby";
      case lang === "php":
      return "php";
    case lang === "go":
      return "golang";
    case lang === "kotlin":
      return "kotlin";
    default:
    return "python";
  }
};


// need to use this because ace-editor lang support and jdoodle language support is different and syntax difference

export default langForEditor;
