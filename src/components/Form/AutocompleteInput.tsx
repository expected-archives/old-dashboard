import { styled, theme } from "../../style"
import { Input } from "./Input";

import React, { ChangeEvent, FocusEventHandler, KeyboardEventHandler, useEffect, useState } from "react";

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

  useEffect(() => {
    const blur = (ev: any) => {
      if (!Array.from(document.getElementsByClassName("autocomplete-item")).some(e => e === ev)) {
        setCompletions([])
      }
    }
    document.addEventListener("click", blur)
    return () => document.removeEventListener("click", blur)
  })

  const change = (e: event) => {
    setValue(e.target.value)
    setCompletions(suggestions.filter(x => e.target.value.length > 0 && x.startsWith(e.target.value)))
    onChange(e)
  }

  const select = (val: string) => {
    console.log("value", val)
    setCompletions([])
    setValue(val);
  }

  const key = (e: any) => {
    console.log(e.keyCode)
    switch (e.keyCode) {
      // esc
      case 27:
        setCompletions([])
        break
      // down
      case 40:
      // up
      case 38:
    }
  }

  return (
    <div onKeyDown={key}>
      <AutocompleteInput value={value} name={name} onChange={change} autoComplete="off"/>
      {
        completions.length > 0
          ?
          <AutocompleteItems>
            {completions.map((val, index) => (<AutocompleteItem onClick={(_) => {
              console.log(val)
              select(val)
            }} className={"autocomplete-item"} key={index}>{val}</AutocompleteItem>))}
          </AutocompleteItems>
          : <></>
      }
    </div>
  )
}

