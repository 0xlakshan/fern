// This file was auto-generated by Fern from our API Definition.

package api

import (
	json "encoding/json"
	fmt "fmt"
	internal "github.com/fern-api/fern-go/internal/testdata/model/undiscriminated/fixtures/internal"
	time "time"
)

type AnotherUnion struct {
	String            string
	FernStringLiteral string
	Foo               *Foo

	typ string
}

func NewAnotherUnionFromString(value string) *AnotherUnion {
	return &AnotherUnion{typ: "String", String: value}
}

func NewAnotherUnionWithFernStringLiteral() *AnotherUnion {
	return &AnotherUnion{typ: "FernStringLiteral", FernStringLiteral: "fern"}
}

func NewAnotherUnionFromFoo(value *Foo) *AnotherUnion {
	return &AnotherUnion{typ: "Foo", Foo: value}
}

func (a *AnotherUnion) GetString() string {
	if a == nil {
		return ""
	}
	return a.String
}

func (a *AnotherUnion) GetFoo() *Foo {
	if a == nil {
		return nil
	}
	return a.Foo
}

func (a *AnotherUnion) UnmarshalJSON(data []byte) error {
	var valueString string
	if err := json.Unmarshal(data, &valueString); err == nil {
		a.typ = "String"
		a.String = valueString
		return nil
	}
	var valueFernStringLiteral string
	if err := json.Unmarshal(data, &valueFernStringLiteral); err == nil {
		a.typ = "FernStringLiteral"
		a.FernStringLiteral = valueFernStringLiteral
		if a.FernStringLiteral != "fern" {
			return fmt.Errorf("unexpected value for literal on type %T; expected %v got %v", a, "fern", valueFernStringLiteral)
		}
		return nil
	}
	valueFoo := new(Foo)
	if err := json.Unmarshal(data, &valueFoo); err == nil {
		a.typ = "Foo"
		a.Foo = valueFoo
		return nil
	}
	return fmt.Errorf("%s cannot be deserialized as a %T", data, a)
}

func (a AnotherUnion) MarshalJSON() ([]byte, error) {
	if a.typ == "String" || a.String != "" {
		return json.Marshal(a.String)
	}
	if a.typ == "FernStringLiteral" || a.FernStringLiteral != "" {
		return json.Marshal("fern")
	}
	if a.typ == "Foo" || a.Foo != nil {
		return json.Marshal(a.Foo)
	}
	return nil, fmt.Errorf("type %T does not include a non-empty union type", a)
}

type AnotherUnionVisitor interface {
	VisitString(string) error
	VisitFernStringLiteral(string) error
	VisitFoo(*Foo) error
}

func (a *AnotherUnion) Accept(visitor AnotherUnionVisitor) error {
	if a.typ == "String" || a.String != "" {
		return visitor.VisitString(a.String)
	}
	if a.typ == "FernStringLiteral" || a.FernStringLiteral != "" {
		return visitor.VisitFernStringLiteral(a.FernStringLiteral)
	}
	if a.typ == "Foo" || a.Foo != nil {
		return visitor.VisitFoo(a.Foo)
	}
	return fmt.Errorf("type %T does not include a non-empty union type", a)
}

type Bar struct {
	Name string `json:"name" url:"name"`

	extraProperties map[string]interface{}
}

func (b *Bar) GetName() string {
	if b == nil {
		return ""
	}
	return b.Name
}

func (b *Bar) GetExtraProperties() map[string]interface{} {
	return b.extraProperties
}

func (b *Bar) UnmarshalJSON(data []byte) error {
	type unmarshaler Bar
	var value unmarshaler
	if err := json.Unmarshal(data, &value); err != nil {
		return err
	}
	*b = Bar(value)
	extraProperties, err := internal.ExtractExtraProperties(data, *b)
	if err != nil {
		return err
	}
	b.extraProperties = extraProperties
	return nil
}

func (b *Bar) String() string {
	if value, err := internal.StringifyJSON(b); err == nil {
		return value
	}
	return fmt.Sprintf("%#v", b)
}

type Baz struct {
	Id string `json:"id" url:"id"`

	extraProperties map[string]interface{}
}

func (b *Baz) GetId() string {
	if b == nil {
		return ""
	}
	return b.Id
}

func (b *Baz) GetExtraProperties() map[string]interface{} {
	return b.extraProperties
}

func (b *Baz) UnmarshalJSON(data []byte) error {
	type unmarshaler Baz
	var value unmarshaler
	if err := json.Unmarshal(data, &value); err != nil {
		return err
	}
	*b = Baz(value)
	extraProperties, err := internal.ExtractExtraProperties(data, *b)
	if err != nil {
		return err
	}
	b.extraProperties = extraProperties
	return nil
}

func (b *Baz) String() string {
	if value, err := internal.StringifyJSON(b); err == nil {
		return value
	}
	return fmt.Sprintf("%#v", b)
}

type Foo struct {
	Name string `json:"name" url:"name"`

	extraProperties map[string]interface{}
}

func (f *Foo) GetName() string {
	if f == nil {
		return ""
	}
	return f.Name
}

func (f *Foo) GetExtraProperties() map[string]interface{} {
	return f.extraProperties
}

func (f *Foo) UnmarshalJSON(data []byte) error {
	type unmarshaler Foo
	var value unmarshaler
	if err := json.Unmarshal(data, &value); err != nil {
		return err
	}
	*f = Foo(value)
	extraProperties, err := internal.ExtractExtraProperties(data, *f)
	if err != nil {
		return err
	}
	f.extraProperties = extraProperties
	return nil
}

func (f *Foo) String() string {
	if value, err := internal.StringifyJSON(f); err == nil {
		return value
	}
	return fmt.Sprintf("%#v", f)
}

type Union struct {
	Foo                  *Foo
	Bar                  *Bar
	Baz                  *Baz
	String               string
	IntegerOptional      *int
	StringBooleanMap     map[string]bool
	StringList           []string
	StringListList       [][]string
	DoubleSet            []float64
	FernStringLiteral    string
	AnotherStringLiteral string

	typ string
}

func NewUnionFromFoo(value *Foo) *Union {
	return &Union{typ: "Foo", Foo: value}
}

func NewUnionFromBar(value *Bar) *Union {
	return &Union{typ: "Bar", Bar: value}
}

func NewUnionFromBaz(value *Baz) *Union {
	return &Union{typ: "Baz", Baz: value}
}

func NewUnionFromString(value string) *Union {
	return &Union{typ: "String", String: value}
}

func NewUnionFromIntegerOptional(value *int) *Union {
	return &Union{typ: "IntegerOptional", IntegerOptional: value}
}

func NewUnionFromStringBooleanMap(value map[string]bool) *Union {
	return &Union{typ: "StringBooleanMap", StringBooleanMap: value}
}

func NewUnionFromStringList(value []string) *Union {
	return &Union{typ: "StringList", StringList: value}
}

func NewUnionFromStringListList(value [][]string) *Union {
	return &Union{typ: "StringListList", StringListList: value}
}

func NewUnionFromDoubleSet(value []float64) *Union {
	return &Union{typ: "DoubleSet", DoubleSet: value}
}

func NewUnionWithFernStringLiteral() *Union {
	return &Union{typ: "FernStringLiteral", FernStringLiteral: "fern"}
}

func NewUnionWithAnotherStringLiteral() *Union {
	return &Union{typ: "AnotherStringLiteral", AnotherStringLiteral: "another"}
}

func (u *Union) GetFoo() *Foo {
	if u == nil {
		return nil
	}
	return u.Foo
}

func (u *Union) GetBar() *Bar {
	if u == nil {
		return nil
	}
	return u.Bar
}

func (u *Union) GetBaz() *Baz {
	if u == nil {
		return nil
	}
	return u.Baz
}

func (u *Union) GetString() string {
	if u == nil {
		return ""
	}
	return u.String
}

func (u *Union) GetIntegerOptional() *int {
	if u == nil {
		return nil
	}
	return u.IntegerOptional
}

func (u *Union) GetStringBooleanMap() map[string]bool {
	if u == nil {
		return nil
	}
	return u.StringBooleanMap
}

func (u *Union) GetStringList() []string {
	if u == nil {
		return nil
	}
	return u.StringList
}

func (u *Union) GetStringListList() [][]string {
	if u == nil {
		return nil
	}
	return u.StringListList
}

func (u *Union) GetDoubleSet() []float64 {
	if u == nil {
		return nil
	}
	return u.DoubleSet
}

func (u *Union) UnmarshalJSON(data []byte) error {
	valueFoo := new(Foo)
	if err := json.Unmarshal(data, &valueFoo); err == nil {
		u.typ = "Foo"
		u.Foo = valueFoo
		return nil
	}
	valueBar := new(Bar)
	if err := json.Unmarshal(data, &valueBar); err == nil {
		u.typ = "Bar"
		u.Bar = valueBar
		return nil
	}
	valueBaz := new(Baz)
	if err := json.Unmarshal(data, &valueBaz); err == nil {
		u.typ = "Baz"
		u.Baz = valueBaz
		return nil
	}
	var valueString string
	if err := json.Unmarshal(data, &valueString); err == nil {
		u.typ = "String"
		u.String = valueString
		return nil
	}
	var valueIntegerOptional *int
	if err := json.Unmarshal(data, &valueIntegerOptional); err == nil {
		u.typ = "IntegerOptional"
		u.IntegerOptional = valueIntegerOptional
		return nil
	}
	var valueStringBooleanMap map[string]bool
	if err := json.Unmarshal(data, &valueStringBooleanMap); err == nil {
		u.typ = "StringBooleanMap"
		u.StringBooleanMap = valueStringBooleanMap
		return nil
	}
	var valueStringList []string
	if err := json.Unmarshal(data, &valueStringList); err == nil {
		u.typ = "StringList"
		u.StringList = valueStringList
		return nil
	}
	var valueStringListList [][]string
	if err := json.Unmarshal(data, &valueStringListList); err == nil {
		u.typ = "StringListList"
		u.StringListList = valueStringListList
		return nil
	}
	var valueDoubleSet []float64
	if err := json.Unmarshal(data, &valueDoubleSet); err == nil {
		u.typ = "DoubleSet"
		u.DoubleSet = valueDoubleSet
		return nil
	}
	var valueFernStringLiteral string
	if err := json.Unmarshal(data, &valueFernStringLiteral); err == nil {
		u.typ = "FernStringLiteral"
		u.FernStringLiteral = valueFernStringLiteral
		if u.FernStringLiteral != "fern" {
			return fmt.Errorf("unexpected value for literal on type %T; expected %v got %v", u, "fern", valueFernStringLiteral)
		}
		return nil
	}
	var valueAnotherStringLiteral string
	if err := json.Unmarshal(data, &valueAnotherStringLiteral); err == nil {
		u.typ = "AnotherStringLiteral"
		u.AnotherStringLiteral = valueAnotherStringLiteral
		if u.AnotherStringLiteral != "another" {
			return fmt.Errorf("unexpected value for literal on type %T; expected %v got %v", u, "another", valueAnotherStringLiteral)
		}
		return nil
	}
	return fmt.Errorf("%s cannot be deserialized as a %T", data, u)
}

func (u Union) MarshalJSON() ([]byte, error) {
	if u.typ == "Foo" || u.Foo != nil {
		return json.Marshal(u.Foo)
	}
	if u.typ == "Bar" || u.Bar != nil {
		return json.Marshal(u.Bar)
	}
	if u.typ == "Baz" || u.Baz != nil {
		return json.Marshal(u.Baz)
	}
	if u.typ == "String" || u.String != "" {
		return json.Marshal(u.String)
	}
	if u.typ == "IntegerOptional" || u.IntegerOptional != nil {
		return json.Marshal(u.IntegerOptional)
	}
	if u.typ == "StringBooleanMap" || u.StringBooleanMap != nil {
		return json.Marshal(u.StringBooleanMap)
	}
	if u.typ == "StringList" || u.StringList != nil {
		return json.Marshal(u.StringList)
	}
	if u.typ == "StringListList" || u.StringListList != nil {
		return json.Marshal(u.StringListList)
	}
	if u.typ == "DoubleSet" || u.DoubleSet != nil {
		return json.Marshal(u.DoubleSet)
	}
	if u.typ == "FernStringLiteral" || u.FernStringLiteral != "" {
		return json.Marshal("fern")
	}
	if u.typ == "AnotherStringLiteral" || u.AnotherStringLiteral != "" {
		return json.Marshal("another")
	}
	return nil, fmt.Errorf("type %T does not include a non-empty union type", u)
}

type UnionVisitor interface {
	VisitFoo(*Foo) error
	VisitBar(*Bar) error
	VisitBaz(*Baz) error
	VisitString(string) error
	VisitIntegerOptional(*int) error
	VisitStringBooleanMap(map[string]bool) error
	VisitStringList([]string) error
	VisitStringListList([][]string) error
	VisitDoubleSet([]float64) error
	VisitFernStringLiteral(string) error
	VisitAnotherStringLiteral(string) error
}

func (u *Union) Accept(visitor UnionVisitor) error {
	if u.typ == "Foo" || u.Foo != nil {
		return visitor.VisitFoo(u.Foo)
	}
	if u.typ == "Bar" || u.Bar != nil {
		return visitor.VisitBar(u.Bar)
	}
	if u.typ == "Baz" || u.Baz != nil {
		return visitor.VisitBaz(u.Baz)
	}
	if u.typ == "String" || u.String != "" {
		return visitor.VisitString(u.String)
	}
	if u.typ == "IntegerOptional" || u.IntegerOptional != nil {
		return visitor.VisitIntegerOptional(u.IntegerOptional)
	}
	if u.typ == "StringBooleanMap" || u.StringBooleanMap != nil {
		return visitor.VisitStringBooleanMap(u.StringBooleanMap)
	}
	if u.typ == "StringList" || u.StringList != nil {
		return visitor.VisitStringList(u.StringList)
	}
	if u.typ == "StringListList" || u.StringListList != nil {
		return visitor.VisitStringListList(u.StringListList)
	}
	if u.typ == "DoubleSet" || u.DoubleSet != nil {
		return visitor.VisitDoubleSet(u.DoubleSet)
	}
	if u.typ == "FernStringLiteral" || u.FernStringLiteral != "" {
		return visitor.VisitFernStringLiteral(u.FernStringLiteral)
	}
	if u.typ == "AnotherStringLiteral" || u.AnotherStringLiteral != "" {
		return visitor.VisitAnotherStringLiteral(u.AnotherStringLiteral)
	}
	return fmt.Errorf("type %T does not include a non-empty union type", u)
}

type UnionWithLiteral struct {
	FernStringLiteral string
	String            string

	typ string
}

func NewUnionWithLiteralWithFernStringLiteral() *UnionWithLiteral {
	return &UnionWithLiteral{typ: "FernStringLiteral", FernStringLiteral: "fern"}
}

func NewUnionWithLiteralFromString(value string) *UnionWithLiteral {
	return &UnionWithLiteral{typ: "String", String: value}
}

func (u *UnionWithLiteral) GetString() string {
	if u == nil {
		return ""
	}
	return u.String
}

func (u *UnionWithLiteral) UnmarshalJSON(data []byte) error {
	var valueFernStringLiteral string
	if err := json.Unmarshal(data, &valueFernStringLiteral); err == nil {
		u.typ = "FernStringLiteral"
		u.FernStringLiteral = valueFernStringLiteral
		if u.FernStringLiteral != "fern" {
			return fmt.Errorf("unexpected value for literal on type %T; expected %v got %v", u, "fern", valueFernStringLiteral)
		}
		return nil
	}
	var valueString string
	if err := json.Unmarshal(data, &valueString); err == nil {
		u.typ = "String"
		u.String = valueString
		return nil
	}
	return fmt.Errorf("%s cannot be deserialized as a %T", data, u)
}

func (u UnionWithLiteral) MarshalJSON() ([]byte, error) {
	if u.typ == "FernStringLiteral" || u.FernStringLiteral != "" {
		return json.Marshal("fern")
	}
	if u.typ == "String" || u.String != "" {
		return json.Marshal(u.String)
	}
	return nil, fmt.Errorf("type %T does not include a non-empty union type", u)
}

type UnionWithLiteralVisitor interface {
	VisitFernStringLiteral(string) error
	VisitString(string) error
}

func (u *UnionWithLiteral) Accept(visitor UnionWithLiteralVisitor) error {
	if u.typ == "FernStringLiteral" || u.FernStringLiteral != "" {
		return visitor.VisitFernStringLiteral(u.FernStringLiteral)
	}
	if u.typ == "String" || u.String != "" {
		return visitor.VisitString(u.String)
	}
	return fmt.Errorf("type %T does not include a non-empty union type", u)
}

type UnionWithOptionalTime struct {
	DateOptional     *time.Time
	DateTimeOptional *time.Time

	typ string
}

func NewUnionWithOptionalTimeFromDateOptional(value *time.Time) *UnionWithOptionalTime {
	return &UnionWithOptionalTime{typ: "DateOptional", DateOptional: value}
}

func NewUnionWithOptionalTimeFromDateTimeOptional(value *time.Time) *UnionWithOptionalTime {
	return &UnionWithOptionalTime{typ: "DateTimeOptional", DateTimeOptional: value}
}

func (u *UnionWithOptionalTime) GetDateOptional() *time.Time {
	if u == nil {
		return nil
	}
	return u.DateOptional
}

func (u *UnionWithOptionalTime) GetDateTimeOptional() *time.Time {
	if u == nil {
		return nil
	}
	return u.DateTimeOptional
}

func (u *UnionWithOptionalTime) UnmarshalJSON(data []byte) error {
	var valueDateOptional *internal.Date
	if err := json.Unmarshal(data, &valueDateOptional); err == nil {
		u.typ = "DateOptional"
		u.DateOptional = valueDateOptional.TimePtr()
		return nil
	}
	var valueDateTimeOptional *internal.DateTime
	if err := json.Unmarshal(data, &valueDateTimeOptional); err == nil {
		u.typ = "DateTimeOptional"
		u.DateTimeOptional = valueDateTimeOptional.TimePtr()
		return nil
	}
	return fmt.Errorf("%s cannot be deserialized as a %T", data, u)
}

func (u UnionWithOptionalTime) MarshalJSON() ([]byte, error) {
	if u.typ == "DateOptional" || u.DateOptional != nil {
		return json.Marshal(internal.NewOptionalDate(u.DateOptional))
	}
	if u.typ == "DateTimeOptional" || u.DateTimeOptional != nil {
		return json.Marshal(internal.NewOptionalDateTime(u.DateTimeOptional))
	}
	return nil, fmt.Errorf("type %T does not include a non-empty union type", u)
}

type UnionWithOptionalTimeVisitor interface {
	VisitDateOptional(*time.Time) error
	VisitDateTimeOptional(*time.Time) error
}

func (u *UnionWithOptionalTime) Accept(visitor UnionWithOptionalTimeVisitor) error {
	if u.typ == "DateOptional" || u.DateOptional != nil {
		return visitor.VisitDateOptional(u.DateOptional)
	}
	if u.typ == "DateTimeOptional" || u.DateTimeOptional != nil {
		return visitor.VisitDateTimeOptional(u.DateTimeOptional)
	}
	return fmt.Errorf("type %T does not include a non-empty union type", u)
}

type UnionWithTime struct {
	Integer          int
	Date             time.Time
	DateTime         time.Time
	DateOptional     *time.Time
	DateTimeOptional *time.Time

	typ string
}

func NewUnionWithTimeFromInteger(value int) *UnionWithTime {
	return &UnionWithTime{typ: "Integer", Integer: value}
}

func NewUnionWithTimeFromDate(value time.Time) *UnionWithTime {
	return &UnionWithTime{typ: "Date", Date: value}
}

func NewUnionWithTimeFromDateTime(value time.Time) *UnionWithTime {
	return &UnionWithTime{typ: "DateTime", DateTime: value}
}

func NewUnionWithTimeFromDateOptional(value *time.Time) *UnionWithTime {
	return &UnionWithTime{typ: "DateOptional", DateOptional: value}
}

func NewUnionWithTimeFromDateTimeOptional(value *time.Time) *UnionWithTime {
	return &UnionWithTime{typ: "DateTimeOptional", DateTimeOptional: value}
}

func (u *UnionWithTime) GetInteger() int {
	if u == nil {
		return 0
	}
	return u.Integer
}

func (u *UnionWithTime) GetDate() time.Time {
	if u == nil {
		return time.Time{}
	}
	return u.Date
}

func (u *UnionWithTime) GetDateTime() time.Time {
	if u == nil {
		return time.Time{}
	}
	return u.DateTime
}

func (u *UnionWithTime) GetDateOptional() *time.Time {
	if u == nil {
		return nil
	}
	return u.DateOptional
}

func (u *UnionWithTime) GetDateTimeOptional() *time.Time {
	if u == nil {
		return nil
	}
	return u.DateTimeOptional
}

func (u *UnionWithTime) UnmarshalJSON(data []byte) error {
	var valueInteger int
	if err := json.Unmarshal(data, &valueInteger); err == nil {
		u.typ = "Integer"
		u.Integer = valueInteger
		return nil
	}
	var valueDate *internal.Date
	if err := json.Unmarshal(data, &valueDate); err == nil {
		u.typ = "Date"
		u.Date = valueDate.Time()
		return nil
	}
	var valueDateTime *internal.DateTime
	if err := json.Unmarshal(data, &valueDateTime); err == nil {
		u.typ = "DateTime"
		u.DateTime = valueDateTime.Time()
		return nil
	}
	var valueDateOptional *internal.Date
	if err := json.Unmarshal(data, &valueDateOptional); err == nil {
		u.typ = "DateOptional"
		u.DateOptional = valueDateOptional.TimePtr()
		return nil
	}
	var valueDateTimeOptional *internal.DateTime
	if err := json.Unmarshal(data, &valueDateTimeOptional); err == nil {
		u.typ = "DateTimeOptional"
		u.DateTimeOptional = valueDateTimeOptional.TimePtr()
		return nil
	}
	return fmt.Errorf("%s cannot be deserialized as a %T", data, u)
}

func (u UnionWithTime) MarshalJSON() ([]byte, error) {
	if u.typ == "Integer" || u.Integer != 0 {
		return json.Marshal(u.Integer)
	}
	if u.typ == "Date" || !u.Date.IsZero() {
		return json.Marshal(internal.NewDate(u.Date))
	}
	if u.typ == "DateTime" || !u.DateTime.IsZero() {
		return json.Marshal(internal.NewDateTime(u.DateTime))
	}
	if u.typ == "DateOptional" || u.DateOptional != nil {
		return json.Marshal(internal.NewOptionalDate(u.DateOptional))
	}
	if u.typ == "DateTimeOptional" || u.DateTimeOptional != nil {
		return json.Marshal(internal.NewOptionalDateTime(u.DateTimeOptional))
	}
	return nil, fmt.Errorf("type %T does not include a non-empty union type", u)
}

type UnionWithTimeVisitor interface {
	VisitInteger(int) error
	VisitDate(time.Time) error
	VisitDateTime(time.Time) error
	VisitDateOptional(*time.Time) error
	VisitDateTimeOptional(*time.Time) error
}

func (u *UnionWithTime) Accept(visitor UnionWithTimeVisitor) error {
	if u.typ == "Integer" || u.Integer != 0 {
		return visitor.VisitInteger(u.Integer)
	}
	if u.typ == "Date" || !u.Date.IsZero() {
		return visitor.VisitDate(u.Date)
	}
	if u.typ == "DateTime" || !u.DateTime.IsZero() {
		return visitor.VisitDateTime(u.DateTime)
	}
	if u.typ == "DateOptional" || u.DateOptional != nil {
		return visitor.VisitDateOptional(u.DateOptional)
	}
	if u.typ == "DateTimeOptional" || u.DateTimeOptional != nil {
		return visitor.VisitDateTimeOptional(u.DateTimeOptional)
	}
	return fmt.Errorf("type %T does not include a non-empty union type", u)
}
