import { styled, theme } from "../../style"
import React, { KeyboardEvent, useReducer, useState } from "react"

const Input = styled.input`
  width: auto;
  flex-grow: 1;
  flex-shrink: 0;
  border: none;
  outline: none;
  box-shadow: none;
  font-size: .9375rem;
  font-weight: 400;
  line-height: 1.5;
  height: calc(2.6rem);
  background-clip: padding-box;
`

const Tag = styled.div`
  display: inline;
  background: ${props => props.theme.color.dark};
  color: ${props => props.theme.color.light};
  padding: 0.2rem 0.8rem;
  margin-right: 5px;
  border-radius: 15px;
  cursor: pointer;
`

interface IAutocompleteProps {
  focus?: boolean
}

const Autocomplete = styled.div<IAutocompleteProps>`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  color: ${props => props.theme.text.normal};
  background-color: ${props => props.theme.color.light};
  border: 1px solid ${props => props.focus ? props.theme.color.blue : props.theme.color.grey};
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  padding: 0.575rem 0.75rem;
  
  &:disabled, &[readonly] {
    background: ${props => props.theme.color.grey};
  }
`

const SuggestionList = styled.div`
  position: absolute;
  will-change: transform;
  top: 0;
  left: 0;
  width: 100%;
  transform: translate3d(0, 38px, 0);
  border: 1px solid #edf2f9;
  box-shadow: 0 0.75rem 1.5rem rgba(18, 38, 63, 0.03);
  background-color: ${props => props.theme.color.light};
  border-radius: .25rem;
  padding: .4rem 0;
  z-index: 1000;
  float: left;
`

const TagInput = styled.div`
  position: relative;
`

const Suggestion = styled.div`
  cursor: pointer;
  background: white;
  padding: 0.3rem 0.8rem 0.3rem 0.8rem;
  
  :hover{
    background: ${theme.color.greyLight};
  }
`

interface IState {
  value: string
  tags: string[]
  suggestions: string[]
  currentSuggestions: string[]
  suggestionOffset: number
  suggestionIndex: number
  tagIndex: number
}

type Action =
  { action: "SET_VALUE", value: string } |
  { action: "ADD_TAG", value: string } |
  { action: "DELETE_TAG", value: string } |
  { action: "SET_TAG_INDEX", value: number } |
  { action: "SET_SUGGESTION_INDEX", value: number }

const reducer = (state: IState, action: Action) => {
  switch (action.action) {
    case "SET_VALUE":
      return {
        ...state,
        value: action.value,
        currentSuggestions: action.value.trim() ? state.suggestions
          .filter(s => s.startsWith(action.value) && !state.tags.includes(s)).slice(0, 5) : [],
        tagIndex: -1,
        suggestionIndex: -1,
      }
    case "ADD_TAG":
      return {
        ...state,
        value: "",
        tags: state.tags.includes(action.value) || !action.value.trim() ?
          state.tags : [...state.tags, action.value],
        currentSuggestions: [],
        tagIndex: -1,
        suggestionIndex: -1,
      }
    case "DELETE_TAG":
      return {
        ...state,
        tags: state.tags.filter(tag => tag !== action.value),
        tagIndex: -1,
        suggestionIndex: -1,
      }
    case "SET_TAG_INDEX":
      return {
        ...state,
        tagIndex: action.value < 0 || action.value >= state.tags.length ?
          (action.value < 0 ? state.tags.length - 1 : 0) : action.value,
      }
    case "SET_SUGGESTION_INDEX":
      return {
        ...state,
        suggestionIndex: action.value < 0 || action.value >= state.currentSuggestions.length ?
          (action.value < 0 ? state.tags.length - 1 : 0) : action.value,
      }
  }
  return state
}

interface IProps {
  suggestions: string[]
  value?: string[]
  placeholder?: string
  onChange?: (value: string[]) => any
}

export default ({ onChange, suggestions, placeholder = "", value = [] }: IProps) => {
  const [state, dispatch] = useReducer(reducer, {
    value: "",
    tags: value,
    suggestions,
    currentSuggestions: [],
    suggestionOffset: 0,
    suggestionIndex: -1,
    tagIndex: -1,
  })
  const [focus, setFocus] = useState(false)

  if (onChange && state.tags.length) {
    onChange(state.tags)
  }

  const handleInputKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if ([" ", "Enter", ";", ","].includes(event.key)) {
      event.preventDefault()
      dispatch({
        action: "ADD_TAG",
        value: state.suggestionIndex !== -1 ? state.currentSuggestions[state.suggestionIndex] : state.value,
      })
    } else if (["ArrowLeft", "ArrowRight"].includes(event.key) && (state.tagIndex !== -1 || !state.value.trim())) {
      event.preventDefault()
      dispatch({
        action: "SET_TAG_INDEX",
        value: event.key === "ArrowLeft" ? state.tagIndex - 1 : state.tagIndex + 1,
      })
    } else if (["ArrowUp", "ArrowDown"].includes(event.key)) {
      event.preventDefault()
      dispatch({
        action: "SET_SUGGESTION_INDEX",
        value: event.key === "ArrowUp" ? state.suggestionIndex - 1 : state.suggestionIndex + 1,
      })
    } else if (event.key === "Backspace" && (state.tagIndex !== -1 || !state.value.trim())) {
      event.preventDefault()
      dispatch({
        action: "DELETE_TAG",
        value: state.tags[state.tagIndex !== -1 ? state.tagIndex : state.tags.length - 1],
      })
    }
  }

  return (
    <TagInput onFocus={() => setFocus(true)} onBlur={() => setFocus(true)}>
      <Autocomplete focus={focus}>
        {state.tags.map((tag, index) => (
          <Tag key={index} onClick={() => dispatch({ action: "DELETE_TAG", value: tag })}
               style={index !== state.tagIndex ? {} : { background: theme.color.dark }}>
            {tag}
          </Tag>
        ))}
        <Input type="text" autoComplete="off" placeholder={placeholder} value={state.value} onKeyDown={handleInputKey}
               onChange={(e) => dispatch({ action: "SET_VALUE", value: e.target.value })}/>
      </Autocomplete>
      {(state.currentSuggestions.length > 0 && focus) && (
        <SuggestionList>
          {state.currentSuggestions.map((value, index) => (
            <Suggestion key={index} onClick={() => dispatch({ action: "ADD_TAG", value })}
                        style={index === state.suggestionIndex ? { background: theme.color.greyLight } : {}}>
              {value}
            </Suggestion>
          ))}
        </SuggestionList>
      )}
    </TagInput>
  )
}
