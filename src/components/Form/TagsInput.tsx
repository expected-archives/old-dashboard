import { styled, theme } from "../../style"
import React, { ChangeEvent, useEffect, useState } from "react";

const Input = styled.input`
  width: auto;
  margin-bottom: 5px;
  flex-grow: 1;
  flex-shrink: 0;
  border: none;
  outline: none;
  box-shadow: none;
  font-size: .9375rem;
  font-weight: 400;
  line-height: 1.5;
  background-clip: padding-box;
  &:focus {
    outline: none;
    box-shadow: none;
  }
  &:disabled, &[readonly] {
     background: ${props => props.theme.color.grey};
  }
`

const Tag = styled.p`
  margin-bottom: 0.375rem;
  border-radius: 3px;
  flex-grow:0;
  flex-shrink:0;
  background: ${theme.color.greyDark};
  color: white;
  display: inline-block;
  max-width: 100%;
  word-wrap: break-word;
  padding: 0 0.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
`

const Autocomplete = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  padding: 0.375rem 0.75rem 0;
  font-size: .9375rem;
  font-weight: 400;
  line-height: 1.5;
  color: ${props => props.theme.text.normal};
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid ${props => props.theme.color.grey};
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  
  &:focus {
    outline: none;
    box-shadow: none;
    border-color: ${props => props.theme.color.blue};
  }
  
  &:disabled, &[readonly] {
    background: ${props => props.theme.color.grey};
  }
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
  onChange: (event: string[]) => void
  name: string,
  placeholder: string,
}

export default ({ name, onChange, suggestions, placeholder = "" }: IProps) => {

  const [completions, setCompletions] = useState<string[]>([])
  const [value, setValue] = useState("")
  const [completionIndex, setCompletionIndex] = useState(-1)
  const [id] = useState('_' + Math.random().toString(36).substr(2, 9))
  const [idInput] = useState('_' + Math.random().toString(36).substr(2, 9))

  const [tags, setTags] = useState<Set<string>>(new Set(["world", "is", 'fun', "and", "it is fun to do that"]))
  const [tagsIndex, setTagsIndex] = useState(-1)

  const updateTags = (list: Set<string>) => {
    onChange(Array.from(list))
    setTags(list)
  }

  useEffect(() => {
    const focusOut = (event: any) => {
      hideCompletion()
      if (event.type === "resize" || (!event.path[0].className.includes("tag") &&
        !event.path[0].className.includes("autocomplete-item"))) {
        hideTagsIndex()
        if (value.trim().length !== 0) {
          addTags(value)
          clean()
        }
      } else {
        event.preventDefault()
      }
    }
    document.addEventListener("click", focusOut)
    window.addEventListener("resize", focusOut)
    return () => {
      document.removeEventListener("click", focusOut)
      window.removeEventListener("resize", focusOut)
    }
  })


  const change = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    hideTagsIndex()
    setValue(e.target.value)
    setCompletions(suggestions
      .filter(x => e.target.value.length > 0 && x.startsWith(e.target.value))
      .slice(0, 5))
  }

  const clean = () => {
    setValue("")
  }

  const select = (val: string) => {
    if (val.trim().length !== 0) {
      console.log(val)
      addTags(val)
      clean()
    }
    hideCompletion()
  }

  const hideCompletion = () => {
    setCompletionIndex(-1)
    setCompletions([])
  }

  const hideTagsIndex = () => setTagsIndex(-1)

  const clickTag = (e: any, tagIndex: number) => {
    e.preventDefault()
    setTagsIndex(tagIndex)
    if (value.trim().length !== 0) {
      addTags(value)
      clean()
    }
    focusInput()
  }

  const clickCompletion = (e: any, completion: string) => {
    e.preventDefault()
    addTags(completion)
    clean()
    hideCompletion()
  }

  const focusInput = () => {
    const input = document.getElementById(idInput)
    console.log(input)
    if (input) return input.focus()
  }

  const addTags = (val: string) => updateTags(new Set(Array.from(tags).concat([val])))
  const removeTags = (val: string) => updateTags(new Set(Array.from(tags).filter(e => e !== val)))

  const key = (e: any) => {

    const completionDown = () => setCompletionIndex(completionIndex + 1 > completions.length - 1 ? 0 : completionIndex + 1)
    const completionUp = () => setCompletionIndex(completionIndex - 1 < 0 ? completions.length - 1 : completionIndex - 1)

    const tagsRight = () => setTagsIndex(tagsIndex + 1 > tags.size - 1 ? 0 : tagsIndex + 1)
    const tagsLeft = () => setTagsIndex(tagsIndex - 1 < 0 ? tags.size - 1 : tagsIndex - 1)

    if (e.keyCode === 13) e.preventDefault()

    if (e.keyCode === 27 || e.keyCode === 9) hideCompletion()
    else if (e.keyCode === 40) completionDown()
    else if (e.keyCode === 38) completionUp()
    else if (e.keyCode === 37 && value.trim().length === 0) tagsLeft()
    else if (e.keyCode === 39 && value.trim().length === 0) tagsRight()
    else if (e.keyCode === 13 && completionIndex !== -1) select(completions[completionIndex])
    else if (e.keyCode === 13 && value.trim().length > 0 && completionIndex === -1) {
      select(value)
      clean()
    } else if (e.keyCode === 8 && value.trim().length === 0) {
      if (tags.size > 0 && tagsIndex === -1) {
        removeTags(Array.from(tags)[tags.size - 1])
        hideTagsIndex()
      } else if (tags.size > 0) {
        removeTags(Array.from(tags)[tagsIndex])
        if (tagsIndex === tags.size - 1)
          hideTagsIndex()
      }
    }
  }

  const sizeOfInput = () => {
    const d = document.getElementById(id)
    if (d) return d.offsetWidth + "px"
    else return '100%'
  }

  return (
    <div onKeyDown={key}>
      <Autocomplete id={id}>
        {Array.from(tags).map((tag, index) =>
          (<Tag className={"tag"} onClick={(e) => clickTag(e, index)}
                style={index !== tagsIndex ? {} : { background: theme.color.dark }} key={index}>{tag}</Tag>))
        }
        <Input id={idInput} type="text" placeholder={placeholder} name={name} value={value} onChange={change}
               autoComplete="off"/>
      </Autocomplete>
      {
        completions.length > 0
          ?
          <AutocompleteItems style={{ width: sizeOfInput() }}>
            {completions.map((val, index) =>
              (<AutocompleteItem className={"autocomplete-item"}
                                 style={index !== completionIndex ? {} : { background: theme.color.grey }}
                                 onClick={(e) => clickCompletion(e, val)} key={index}>{val}</AutocompleteItem>))
            }
          </AutocompleteItems>
          : <></>
      }
    </div>
  )
}

