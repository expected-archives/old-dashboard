import { styled, theme } from "../../style"
import { Input } from "./Input";

import React, { ChangeEvent, useEffect, useState } from "react";

const AutocompleteInput = styled(Input)`
`

const AutocompleteItems = styled.div`
  margin-top: 10px;
  border-radius: 0.25rem;
  position: absolute;
  display: block;
  z-index: 99;
  border: 1px solid ${theme.color.grey};
  width: 100%;
`

const AutocompleteItem = styled.div`
  cursor: pointer;
  background: white;
  padding: 0.3rem 0.8rem 0.3rem 0.8rem;
  :hover{
    background: ${theme.color.grey};
  }
`

interface IProps {
  suggestions: string[]
  tags?: boolean,
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  name: string
}

export default ({ name, onChange, suggestions, tags = false }: IProps) => {

  const [completions, setCompletions] = useState<string[]>([])
  const [value, setValue] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [id] = useState('_' + Math.random().toString(36).substr(2, 9))

  useEffect(() => {
    const focusOut = (_: any) => hide()
    document.addEventListener("click", focusOut)
    window.addEventListener("resize", focusOut)
    return () => {
      document.removeEventListener("click", focusOut)
      window.removeEventListener("resize", focusOut)
    }
  })

  const change = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValue(e.target.value)
    setCompletions(suggestions.filter(x => e.target.value.length > 0 && x.startsWith(e.target.value)))
    onChange(e)
  }

  const select = (val: string) => {
    setValue(val)
    hide()
    onChange({target: {name, value: val}} as ChangeEvent<HTMLInputElement>)
  }

  const hide = () => {
    setSelectedIndex(-1)
    setCompletions([])
  }

  const key = (e: any) => {
    const down = () => setSelectedIndex(selectedIndex + 1 > completions.length - 1 ? 0 : selectedIndex + 1)
    const up = () => setSelectedIndex(selectedIndex + 1 > completions.length - 1 ? 0 : selectedIndex + 1)

    if (e.keyCode === 27 || e.keyCode === 9) hide()
    else if (e.keyCode === 40) down()
    else if (e.keyCode === 38) up()
    else if (e.keyCode === 13) {
      e.preventDefault()
      select(completions[selectedIndex])
    }
  }

  const getSize = () => {
    const d = document.getElementById(id)
    if (d) return d.offsetWidth + "px"
    else return '100%'
  }

  return (
    <div  onKeyDown={key} style={{width: '100%'}}>
      <AutocompleteInput id={id} value={value} name={name} onChange={change} autoComplete="off"/>
      {
        completions.length > 0
          ?
          <AutocompleteItems style={{width: getSize()}}>
            {completions.map((val, index) =>
              (<AutocompleteItem style={index !== selectedIndex ? {} : { background: theme.color.grey }}
                                 onClick={(_) => select(val)} key={index}>{val}</AutocompleteItem>))
            }
          </AutocompleteItems>
          : <></>
      }
    </div>
  )
}

