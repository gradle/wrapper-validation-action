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
#include "../include/tree_update.h"
#include "nodegit_wrapper.cc"

  #include "../include/oid.h"
 
using namespace v8;
using namespace node;
using namespace std;


// generated from struct_content.cc
GitTreeUpdate::GitTreeUpdate() : NodeGitWrapper<GitTreeUpdateTraits>(NULL, true, v8::Local<v8::Object>())
{
  this->raw = new git_tree_update;
 
  this->ConstructFields();
}

GitTreeUpdate::GitTreeUpdate(git_tree_update* raw, bool selfFreeing, v8::Local<v8::Object> owner)
 : NodeGitWrapper<GitTreeUpdateTraits>(raw, selfFreeing, owner)
{
  this->ConstructFields();
}

GitTreeUpdate::~GitTreeUpdate() {
            this->id.Reset();
         }

void GitTreeUpdate::ConstructFields() {
            v8::Local<Object> idTemp = Nan::To<v8::Object>(GitOid::New(
&this->raw->id,
            false
          )).ToLocalChecked();
          this->id.Reset(idTemp);

         }

void GitTreeUpdate::InitializeComponent(v8::Local<v8::Object> target) {
  Nan::HandleScope scope;

  v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  tpl->SetClassName(Nan::New("TreeUpdate").ToLocalChecked());

      Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("action").ToLocalChecked(), GetAction, SetAction);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("id").ToLocalChecked(), GetId, SetId);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("filemode").ToLocalChecked(), GetFilemode, SetFilemode);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("path").ToLocalChecked(), GetPath, SetPath);
   
  InitializeTemplate(tpl);

  v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
  constructor_template.Reset(_constructor_template);
  Nan::Set(target, Nan::New("TreeUpdate").ToLocalChecked(), _constructor_template);
}

    NAN_GETTER(GitTreeUpdate::GetAction) {

      GitTreeUpdate *wrapper = Nan::ObjectWrap::Unwrap<GitTreeUpdate>(info.This());

        info.GetReturnValue().Set(Nan::New((int)wrapper->GetValue()->action));

     }

    NAN_SETTER(GitTreeUpdate::SetAction) {
      GitTreeUpdate *wrapper = Nan::ObjectWrap::Unwrap<GitTreeUpdate>(info.This());

        if (value->IsNumber()) {
          wrapper->GetValue()->action = (git_tree_update_t) Nan::To<int32_t>(value).FromJust();
        }

     }

      NAN_GETTER(GitTreeUpdate::GetId) {

      GitTreeUpdate *wrapper = Nan::ObjectWrap::Unwrap<GitTreeUpdate>(info.This());

        info.GetReturnValue().Set(Nan::New(wrapper->id));

     }

    NAN_SETTER(GitTreeUpdate::SetId) {
      GitTreeUpdate *wrapper = Nan::ObjectWrap::Unwrap<GitTreeUpdate>(info.This());

        v8::Local<Object> id(Nan::To<v8::Object>(value).ToLocalChecked());

        wrapper->id.Reset(id);

        wrapper->raw->id = *  Nan::ObjectWrap::Unwrap<GitOid>(Nan::To<v8::Object>(id).ToLocalChecked())->GetValue() ;

     }

      NAN_GETTER(GitTreeUpdate::GetFilemode) {

      GitTreeUpdate *wrapper = Nan::ObjectWrap::Unwrap<GitTreeUpdate>(info.This());

        info.GetReturnValue().Set(Nan::New((int)wrapper->GetValue()->filemode));

     }

    NAN_SETTER(GitTreeUpdate::SetFilemode) {
      GitTreeUpdate *wrapper = Nan::ObjectWrap::Unwrap<GitTreeUpdate>(info.This());

        if (value->IsNumber()) {
          wrapper->GetValue()->filemode = (git_filemode_t) Nan::To<int32_t>(value).FromJust();
        }

     }

      NAN_GETTER(GitTreeUpdate::GetPath) {

      GitTreeUpdate *wrapper = Nan::ObjectWrap::Unwrap<GitTreeUpdate>(info.This());

        if (wrapper->GetValue()->path) {
          info.GetReturnValue().Set(Nan::New<String>(wrapper->GetValue()->path).ToLocalChecked());
        }
        else {
          return;
        }

     }

    NAN_SETTER(GitTreeUpdate::SetPath) {
      GitTreeUpdate *wrapper = Nan::ObjectWrap::Unwrap<GitTreeUpdate>(info.This());

        if (wrapper->GetValue()->path) {
        }

        Nan::Utf8String str(value);
        wrapper->GetValue()->path = strdup(*str);

     }

   
// force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitTreeUpdateTraits>;
