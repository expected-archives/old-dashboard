import { styled, theme } from "../../style"
import { Input } from "./Input";

import React, { ChangeEvent, useState } from "react";

const AutocompleteInput = styled(Input)`
`

const AutocompleteItems = styled.div`
  margin-top: 10px;
  border-radius: 0.25rem;
  position: absolute;
  z-index: 99;
  border: 1px solid ${theme.color.grey};
`

const AutocompleteItem = styled.div`
  cursor: pointer;
  background: white;
  padding: 0.3rem 0.8rem 0.3rem 0.8rem;
  :hover{
    background: ${theme.color.grey};
  }
`

type event = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

interface IProps {
  suggestions: string[]
  tags?: boolean,
  onChange: (event: event) => void
  name: string
}

export default ({ name, onChange, suggestions, tags = false }: IProps) => {

  let [completions, setCompletions] = useState([] as string[])
  let [value, setValue] = useState("")

  const change = (e: event) => {
    setValue(e.target.value)
    setCompletions(suggestions.filter(x => e.target.value.length > 0 && x.startsWith(e.target.value)))
    onChange(e)
  }

  return (
    <div style={{ position: "relative" }}>
      <AutocompleteInput value={value} name={name} onChange={change}  autoComplete="off"/>
      {
        completions.length > 0
          ? <AutocompleteItems>
            {completions.map((value, index) => (<AutocompleteItem onClick={(_) => { setValue(value); setCompletions([]) } } key={index}>{value}</AutocompleteItem>))}
          </AutocompleteItems>
          : <></>
      }

    </div>
  )
}

