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
#include "../include/describe_options.h"
#include "nodegit_wrapper.cc"

 
using namespace v8;
using namespace node;
using namespace std;


// generated from struct_content.cc
GitDescribeOptions::GitDescribeOptions() : NodeGitWrapper<GitDescribeOptionsTraits>(NULL, true, v8::Local<v8::Object>())
{
        git_describe_options wrappedValue = GIT_DESCRIBE_OPTIONS_INIT;
      this->raw = (git_describe_options*) malloc(sizeof(git_describe_options));
      memcpy(this->raw, &wrappedValue, sizeof(git_describe_options));
  
  this->ConstructFields();
}

GitDescribeOptions::GitDescribeOptions(git_describe_options* raw, bool selfFreeing, v8::Local<v8::Object> owner)
 : NodeGitWrapper<GitDescribeOptionsTraits>(raw, selfFreeing, owner)
{
  this->ConstructFields();
}

GitDescribeOptions::~GitDescribeOptions() {
                   }

void GitDescribeOptions::ConstructFields() {
                   }

void GitDescribeOptions::InitializeComponent(v8::Local<v8::Object> target) {
  Nan::HandleScope scope;

  v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  tpl->SetClassName(Nan::New("DescribeOptions").ToLocalChecked());

      Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("version").ToLocalChecked(), GetVersion, SetVersion);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("maxCandidatesTags").ToLocalChecked(), GetMaxCandidatesTags, SetMaxCandidatesTags);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("describeStrategy").ToLocalChecked(), GetDescribeStrategy, SetDescribeStrategy);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("pattern").ToLocalChecked(), GetPattern, SetPattern);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("onlyFollowFirstParent").ToLocalChecked(), GetOnlyFollowFirstParent, SetOnlyFollowFirstParent);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("showCommitOidAsFallback").ToLocalChecked(), GetShowCommitOidAsFallback, SetShowCommitOidAsFallback);
   
  InitializeTemplate(tpl);

  v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
  constructor_template.Reset(_constructor_template);
  Nan::Set(target, Nan::New("DescribeOptions").ToLocalChecked(), _constructor_template);
}

    NAN_GETTER(GitDescribeOptions::GetVersion) {

      GitDescribeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDescribeOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->version));
     }

    NAN_SETTER(GitDescribeOptions::SetVersion) {
      GitDescribeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDescribeOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->version = (unsigned int) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitDescribeOptions::GetMaxCandidatesTags) {

      GitDescribeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDescribeOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->max_candidates_tags));
     }

    NAN_SETTER(GitDescribeOptions::SetMaxCandidatesTags) {
      GitDescribeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDescribeOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->max_candidates_tags = (unsigned int) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitDescribeOptions::GetDescribeStrategy) {

      GitDescribeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDescribeOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->describe_strategy));
     }

    NAN_SETTER(GitDescribeOptions::SetDescribeStrategy) {
      GitDescribeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDescribeOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->describe_strategy = (unsigned int) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitDescribeOptions::GetPattern) {

      GitDescribeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDescribeOptions>(info.This());

        if (wrapper->GetValue()->pattern) {
          info.GetReturnValue().Set(Nan::New<String>(wrapper->GetValue()->pattern).ToLocalChecked());
        }
        else {
          return;
        }

     }

    NAN_SETTER(GitDescribeOptions::SetPattern) {
      GitDescribeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDescribeOptions>(info.This());

        if (wrapper->GetValue()->pattern) {
        }

        Nan::Utf8String str(value);
        wrapper->GetValue()->pattern = strdup(*str);

     }

      NAN_GETTER(GitDescribeOptions::GetOnlyFollowFirstParent) {

      GitDescribeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDescribeOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->only_follow_first_parent));
     }

    NAN_SETTER(GitDescribeOptions::SetOnlyFollowFirstParent) {
      GitDescribeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDescribeOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->only_follow_first_parent = (int) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitDescribeOptions::GetShowCommitOidAsFallback) {

      GitDescribeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDescribeOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->show_commit_oid_as_fallback));
     }

    NAN_SETTER(GitDescribeOptions::SetShowCommitOidAsFallback) {
      GitDescribeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDescribeOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->show_commit_oid_as_fallback = (int) Nan::To<int32_t>(value).FromJust();
        }
     }

   
// force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitDescribeOptionsTraits>;
