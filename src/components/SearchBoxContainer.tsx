import { useEffect, useState } from "react";
import { CircularProgress, TextField, TextFieldProps } from "@mui/material";
import { useDebounce } from "../hooks/useDebounce";

// Define a interface para as propriedades do componente SearchBoxContainer
interface Props {
  onSearch: (value: string) => void;
}

// Define a interface para as propriedades do componente CustomSearchBox
function CustomSearchBox(props: TextFieldProps) {
  return <TextField {...props} className="SearchBox" />;
}

export function SearchBoxContainer({ onSearch }: Props) {
  const [searchInput, setSearchInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const debouncedValue = useDebounce(searchInput, 500);

  // Atualiza o valor de debouncedValue e chama a função onSearch
  useEffect(() => {
    setIsTyping(false);
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <CustomSearchBox
      label="Pesquisa"
      variant="outlined"
      size="small"
      value={searchInput}
      onChange={(e) => {
        setSearchInput(e.target.value);
        setIsTyping(true);
      }}
      InputProps={{
        endAdornment: isTyping && (
          <CircularProgress size={20} color="inherit" style={{ marginLeft: 5, marginRight: 5 }} />
        ),
      }}
      style={{ marginTop: -5 }}
    />
  );
}
