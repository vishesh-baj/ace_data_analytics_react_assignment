const ThemeToggle = () => {
  return (
    <label className="flex cursor-pointer gap-2">
      <input
        type="checkbox"
        value="nord"
        className="toggle theme-controller toggle-sm"
      />
    </label>
  );
};

export default ThemeToggle;
