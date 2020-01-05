// This is a generated file, modify: generate/templates/templates/struct_content.cc

#include <nan.h>
#include <string.h>
#ifdef WIN32
#include <windows.h>
#else
#include <unistd.h>
#endif // win32

extern "C" {
  #include <git2.h>
 }

#include <iostream>
#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/describe_format_options.h"
#include "nodegit_wrapper.cc"

 
using namespace v8;
using namespace node;
using namespace std;


// generated from struct_content.cc
GitDescribeFormatOptions::GitDescribeFormatOptions() : NodeGitWrapper<GitDescribeFormatOptionsTraits>(NULL, true, v8::Local<v8::Object>())
{
        git_describe_format_options wrappedValue = GIT_DESCRIBE_FORMAT_OPTIONS_INIT;
      this->raw = (git_describe_format_options*) malloc(sizeof(git_describe_format_options));
      memcpy(this->raw, &wrappedValue, sizeof(git_describe_format_options));
  
  this->ConstructFields();
}

GitDescribeFormatOptions::GitDescribeFormatOptions(git_describe_format_options* raw, bool selfFreeing, v8::Local<v8::Object> owner)
 : NodeGitWrapper<GitDescribeFormatOptionsTraits>(raw, selfFreeing, owner)
{
  this->ConstructFields();
}

GitDescribeFormatOptions::~GitDescribeFormatOptions() {
             }

void GitDescribeFormatOptions::ConstructFields() {
             }

void GitDescribeFormatOptions::InitializeComponent(v8::Local<v8::Object> target) {
  Nan::HandleScope scope;

  v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  tpl->SetClassName(Nan::New("DescribeFormatOptions").ToLocalChecked());

      Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("version").ToLocalChecked(), GetVersion, SetVersion);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("abbreviatedSize").ToLocalChecked(), GetAbbreviatedSize, SetAbbreviatedSize);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("alwaysUseLongFormat").ToLocalChecked(), GetAlwaysUseLongFormat, SetAlwaysUseLongFormat);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("dirtySuffix").ToLocalChecked(), GetDirtySuffix, SetDirtySuffix);
   
  InitializeTemplate(tpl);

  v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
  constructor_template.Reset(_constructor_template);
  Nan::Set(target, Nan::New("DescribeFormatOptions").ToLocalChecked(), _constructor_template);
}

    NAN_GETTER(GitDescribeFormatOptions::GetVersion) {

      GitDescribeFormatOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDescribeFormatOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->version));
     }

    NAN_SETTER(GitDescribeFormatOptions::SetVersion) {
      GitDescribeFormatOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDescribeFormatOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->version = (unsigned int) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitDescribeFormatOptions::GetAbbreviatedSize) {

      GitDescribeFormatOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDescribeFormatOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->abbreviated_size));
     }

    NAN_SETTER(GitDescribeFormatOptions::SetAbbreviatedSize) {
      GitDescribeFormatOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDescribeFormatOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->abbreviated_size = (unsigned int) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitDescribeFormatOptions::GetAlwaysUseLongFormat) {

      GitDescribeFormatOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDescribeFormatOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->always_use_long_format));
     }

    NAN_SETTER(GitDescribeFormatOptions::SetAlwaysUseLongFormat) {
      GitDescribeFormatOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDescribeFormatOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->always_use_long_format = (int) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitDescribeFormatOptions::GetDirtySuffix) {

      GitDescribeFormatOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDescribeFormatOptions>(info.This());

        if (wrapper->GetValue()->dirty_suffix) {
          info.GetReturnValue().Set(Nan::New<String>(wrapper->GetValue()->dirty_suffix).ToLocalChecked());
        }
        else {
          return;
        }

     }

    NAN_SETTER(GitDescribeFormatOptions::SetDirtySuffix) {
      GitDescribeFormatOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDescribeFormatOptions>(info.This());

        if (wrapper->GetValue()->dirty_suffix) {
        }

        Nan::Utf8String str(value);
        wrapper->GetValue()->dirty_suffix = strdup(*str);

     }

   
// force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitDescribeFormatOptionsTraits>;
